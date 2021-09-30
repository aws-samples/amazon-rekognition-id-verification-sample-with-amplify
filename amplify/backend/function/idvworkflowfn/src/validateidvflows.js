const { Rekognition, S3 } = require('aws-sdk');

module.exports = {
    validateDetectFacesResponse: function(detectFacesResponse) {
        var response = {
            success: false,
            message: 'Unable to validate'
        };

        if (!detectFacesResponse) {
            response.success = false;
            response.message = "Invalid detectFacesResponse payload";

            return response;
        }

        // make sure there's exactly once face in the pic
        if (!detectFacesResponse.FaceDetails || detectFacesResponse.FaceDetails.length != 1) {
            response.success = false;
            response.message = "Either no face or multiple faces in detectFacesResponse";
            return response;
        }

        // Example of how to you use the 'Roll' metric under 'Pose'
        // to ensure that the face is relatively straight.
        // You can also consult 'Pitch' and 'Yaw' to perform checks for
        // your needs.
        if (Math.abs(detectFacesResponse.FaceDetails[0].Pose.Roll) > 10) {
            response.success = false;
            response.message = 'Please straighten face';
            return response;
        }

        // tweak the confidence threshold here for your needs
        if (detectFacesResponse.FaceDetails[0].Confidence > 90) {
            response.success = true;
            response.message = '';
            return response;
        }

        return response;
    },
    validateDuplicateCheck: function(searchFacesResponse) {
        var response = {
            success: false,
            message: 'Unable to perform duplicate check'
        };

        if (!searchFacesResponse ||
            !searchFacesResponse.FaceMatches) {
            return response;
        }
        
        if(searchFacesResponse.FaceMatches.length < 1) {
            response.success = true;
            response.message = '';
            return response;
        }
        
        response.message = "Found duplicate face";
        return response;
    },
    validateDuplicateCheckForMultipleSearches: async function(multiSearchResponses) {
        var response = {
            success: false,
            message: 'Unable to perform duplicate check'
        };

        return response;
    },
    validateFaceComparison: function(compareFacesResponse) {
        var response = {
            success: false,
            message: 'Unable to validate compare faces'
        };

        if (!compareFacesResponse ||
            !compareFacesResponse.FaceMatches) {
            return response;
        }
        
        if(compareFacesResponse.FaceMatches.length == 1) {
            response.success = true;
            response.message = '';
            return response;
        }
        
        response.message = "Face on id card does not match selfie";
        return response;
    }
}