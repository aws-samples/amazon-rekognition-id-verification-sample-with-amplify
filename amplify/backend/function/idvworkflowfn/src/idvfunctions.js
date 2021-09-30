const { Rekognition, S3, DynamoDB } = require('aws-sdk');
var validateidv = require('./validateidvflows');
var graphqlhelpers = require('./graphqlhelpers');

async function updateUserInfo(userInfoTable, userInfo, externalImageId, regStatus) {
    var docClient = new DynamoDB.DocumentClient();

    var updateExpression = externalImageId ? 
    "set faceid = :fid, registrationstatus = :rs" :
    "set registrationstatus = :rs";

    var exprAttributeValues = externalImageId ? 
    { ":fid": externalImageId, ":rs": regStatus, } :
    { ":rs": regStatus, };

    var ddbParams = {
        TableName: userInfoTable,
        Key: {
            "companyid": 'Amazon',
            "userid": userInfo.userid
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: exprAttributeValues,
        ReturnValues: "UPDATED_NEW"
    }
    var ddbUpdateResponse = await docClient.update(ddbParams).promise();
    if (ddbUpdateResponse &&
        ddbUpdateResponse.Attributes) {
        return {
            success: true
        }
    } else {
        console.log(ddbUpdateResponse);
    }

    return {
        success: false
    }
}

// https://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files
module.exports = {
    testRek: async function (bucket, key) {
        var params = {
            Image: {
                S3Object: {
                    Bucket: bucket,
                    Name: key
                }
            }
        };

        const rek = new Rekognition();
        try {
            const response = await rek.detectModerationLabels(params).promise();
            if (response) {
                return response.ModerationLabels;
            }
            else {
                return [];
            }
        }
        catch (e) {
            console.log(e);
            return [];
        }
    },

    createCollection: async function (collectionId) {
        var params = {
            CollectionId: collectionId
        };

        var response = {
            CollectionId: collectionId,
            Arn: '',
            Success: false,
            Message: ''
        };

        const rek = new Rekognition();
        try {
            // create collection using Rek API
            const createCollResponse = await rek.createCollection(params).promise();
            response.Arn = createCollResponse.CollectionArn;

            // call describe collection so we can cache additional attributes
            const describeCollResponse = await this.describeCollection(collectionId);

            // update cached collections list (in Dynamo, via GraphQL API)
            const createCachedCollResponse = await graphqlhelpers.createCachedCollection(describeCollResponse);
            if(createCachedCollResponse.Success) {
                response.Success = true;
            } else {
                response.Success = false;
                response.Message = "Unable to create cached collection";
            }
        }
        catch (e) {
            response.Success = false;
            response.Message = JSON.stringify(e);
        }

        return response;
    },

    deleteCollection: async function (collectionId) {
        var params = {
            CollectionId: collectionId
        };

        var response = {
            CollectionId: collectionId,
            Success: false,
            Message: ''
        };

        const rek = new Rekognition();
        try {
            const deleteCollResponse = await rek.deleteCollection(params).promise();
            if (deleteCollResponse &&
                deleteCollResponse.StatusCode &&
                deleteCollResponse.StatusCode == 200) {
                
                // now let's delete cached collection
                const deleteCachedCollResponse = await graphqlhelpers.deleteCachedCollection(collectionId);
                response.Success = deleteCachedCollResponse.Success;
                if(!response.Success) {
                    response.Message = "Unable to delete cached collection";
                }
            } else {
                response.Success = false;
                response.Message = "Unable to delete collection";
            }
        }
        catch (e) {
            response.Success = false;
            response.Message = JSON.stringify(e);
        }

        return response;
    },

    listCollections: async function () {
        var params = {};

        const rek = new Rekognition();
        try {
            const response = await rek.listCollections(params).promise();
            var retVal = []
            for (var i = 0; i < response.CollectionIds.length; i++) {
                retVal.push({ CollectionId: response.CollectionIds[i], Arn: '' });
            }

            return retVal;
        }
        catch (e) {
            console.log(e);
            return [];
        }
    },

    describeCollection: async function (collectionId) {
        var params = {
            CollectionId: collectionId,
        };

        const rek = new Rekognition();
        try {
            const response = await rek.describeCollection(params).promise();
            return {
                FaceCount: response.FaceCount,
                FaceModelVersion: response.FaceModelVersion,
                CollectionARN: response.CollectionARN,
                CreationTimestamp: response.CreationTimestamp,
                CollectionId: collectionId,
            }
        }
        catch (e) {
            console.log(e);
            return {};
        }
    },

    registerNewUser: async function (userInfoAsJson) {
        // 1. First check the face image quality via DetectFaces
        // 2. Use SearchFacesByImage against the collection(s) to check for any duplicate registration
        // 3. Index the face image using IndexFaces and use the ExternalImageId (userid, in this case)
        //    to associate the face embeddings with the ExternalImageId
        // 4. Store the face image in the S3 bucket along with the user metadata in DDB (this is already in place)

        // NOTE: In 'registerNewUser', we'll showcase the use of S3-stored images when calling the Rekognition APIs
        //       For details on how to supply image blogs directly to the Rekognition APIs, please see 'registerNewUserWithIdCard'

        const bucket = process.env.STORAGE_IDVIMAGEBUCKET_BUCKETNAME;
        const userInfoTable = process.env.API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME;

        const userInfo = JSON.parse(userInfoAsJson);
        var response = {
            Companyid: userInfo.companyid,
            UserId: userInfo.userid,
            RegistrationStatus: 'error-failed',
            Success: true,
            Message: '',
        };

        const collectionId = await graphqlhelpers.getActiveCollection();
        if(!collectionId) {
            response.Success = false;
            response.Message = "Unable to fetch active collection";
            return response;
        }

        const rek = new Rekognition();
        try {
            var params = {
                Image: {
                    S3Object: {
                        Bucket: bucket,
                        Name: "public/" + userInfo.faceimage
                    }
                }
            };

            // 1. First check the face image quality via DetectFaces
            const detectFacesResponse = await rek.detectFaces(params).promise();
            const detectFacesValidation = validateidv.validateDetectFacesResponse(detectFacesResponse);
            if (!detectFacesValidation.success) {
                response.Message = detectFacesValidation.message;
                response.RegistrationStatus = 'error-detectfaces-failed';
                response.Success = false;
            }

            if (response.Success) {
                // 2. Use SearchFacesByImage against the collection(s) to check for any duplicate registration
                params = {
                    CollectionId: collectionId,
                    FaceMatchThreshold: 95,
                    Image: params.Image // reuse previous
                };

                const searchFacesResponse = await rek.searchFacesByImage(params).promise();
                const duplicateCheckResponse = validateidv.validateDuplicateCheck(searchFacesResponse);
                if (!duplicateCheckResponse.success) {
                    response.Message = duplicateCheckResponse.message;
                    response.RegistrationStatus = 'error-duplicate-found';
                    response.Success = false;
                }
            }

            // 0 for faces that haven't indexed in a collection yet
            var faceId = "";

            // 3. Index the face image using IndexFaces and use the ExternalImageId (userid, in this case)
            //    to associate the face embeddings with the ExternalImageId
            if (response.Success) {
                const externalImageId = userInfo.userid;
                params = {
                    CollectionId: collectionId,
                    DetectionAttributes: [],
                    ExternalImageId: externalImageId,
                    Image: params.Image // reuse previous
                }
                const indexFaceResponse = await rek.indexFaces(params).promise();
                if (!indexFaceResponse ||
                    !indexFaceResponse.FaceRecords ||
                    indexFaceResponse.FaceRecords.length != 1) {
                    response.Message = 'IndexFaces failed';
                    response.RegistrationStatus = 'error-indexfaces-failed';
                    response.Success = false;
                } else {
                    faceId = indexFaceResponse.FaceRecords[0].Face.FaceId;
                    response.RegistrationStatus = 'done';
                    response.Success = true;

                    console.log("Successfully registered user");
                }
            }

            // Now update ddb entry w/ face embeddings id, if successful so far
            // If prev failure, then update reg status in ddb
            const ddbResponse = await updateUserInfo(userInfoTable, userInfo, faceId, response.RegistrationStatus);
            if (!ddbResponse.success) {
                response.Message = 'UserInfo ddb update failed!';
                response.RegistrationStatus = 'error-userinfo-ddb-failed';
                response.Success = false;
            }
            else {
                // Leave message and status as is
            }
        }
        catch (e) {
            response.Message = e.toString();
            response.RegistrationStatus = 'unknown-error';
            response.Success = false;
            console.log(e);
        }

        return response;
    },

    registerNewUserWithIdCard: async function (userInfoAsJson, faceImageDataBase64, idImageDataBase64) {
        // 1. First check the face image quality via DetectFaces
        //    a. For face on id card
        //    b. For selfie
        // 2. Use CompareFaces to ensure that the face in captured image is the same as on the id card
        // 3. Use SearchFacesByImage against the collection(s) to check for any duplicate registration
        // 4. Index the face image using IndexFaces and use the ExternalImageId (userid, in this case)
        //    to associate the face embeddings with the ExternalImageId
        // 5. Store the face image in the S3 bucket along with the user metadata in DDB (this is already in place)

        // NOTE: In 'registerNewUserWithIdCard', we'll supply image blobs directly to the Rekognition APIs
        //       For details on how to supply S3-stored images to the Rekognition APIs, please see 'registerNewUser'

        const bucket = process.env.STORAGE_IDVIMAGEBUCKET_BUCKETNAME;
        const userInfoTable = process.env.API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME;

        const userInfo = JSON.parse(userInfoAsJson);
        var response = {
            Companyid: userInfo.companyid,
            UserId: userInfo.userid,
            RegistrationStatus: 'incomplete',
            Success: true,
            Message: '',
        };

        const collectionId = await graphqlhelpers.getActiveCollection();
        if(!collectionId) {
            response.Success = false;
            response.Message = "Unable to fetch active collection";
            return response;
        }

        const rek = new Rekognition();
        try {
            var faceImageBlob = Buffer.from(faceImageDataBase64, 'base64');
            var idImageBlob = Buffer.from(idImageDataBase64, 'base64');

            var params = {
                Image: {
                    Bytes: faceImageBlob
                }
            };
            // 1a. Check the face image quality via DetectFaces
            var detectFacesResponse = await rek.detectFaces(params).promise();
            var detectFacesValidation = validateidv.validateDetectFacesResponse(detectFacesResponse);
            if (!detectFacesValidation.success) {
                response.Message = detectFacesValidation.message;
                response.RegistrationStatus = 'detectfaces-failed for face (*not* id card)';
                response.Success = false;
            }
            
            // 1b. Check the id card face image quality via DetectFaces
            if (response.Success) {
                params = {
                    Image: {
                        Bytes: idImageBlob
                    }
                };
                detectFacesResponse = await rek.detectFaces(params).promise();
                detectFacesValidation = validateidv.validateDetectFacesResponse(detectFacesResponse);
                if (!detectFacesValidation.success) {
                    response.Message = detectFacesValidation.message;
                    response.RegistrationStatus = 'detectfaces-failed for id card';
                    response.Success = false;
                }
            }
            
            // 2. Compare faces across id card and selfie
            if (response.Success) {
                params = {
                    SimilarityThreshold: 90,
                    SourceImage: {
                        Bytes: faceImageBlob
                    },
                    TargetImage: {
                        Bytes: idImageBlob
                    }
                };
                const compareFacesResponse = await rek.compareFaces(params).promise();
                const compareFacesValidation = validateidv.validateFaceComparison(compareFacesResponse);
                if(!compareFacesValidation.success) {
                    response.Message = compareFacesValidation.message;
                    response.RegistrationStatus = 'compare-faces validation failed';
                    response.Success = false;
                }
            }
            
            // 3. Use SearchFacesByImage against the collection(s) to check for any duplicate registration
            if(response.Success) {
                params = {
                    CollectionId: collectionId,
                    FaceMatchThreshold: 95,
                    Image: {
                        Bytes: faceImageBlob
                    }
                };

                const searchFacesResponse = await rek.searchFacesByImage(params).promise();
                const duplicateCheckResponse = validateidv.validateDuplicateCheck(searchFacesResponse);
                if (!duplicateCheckResponse.success) {
                    response.Message = duplicateCheckResponse.message;
                    response.RegistrationStatus = 'duplicate-found';
                    response.Success = false;
                }
            }
            
            var faceId = "";

            // 4. Index the face image using IndexFaces and use the ExternalImageId (userid, in this case)
            //    to associate the face embeddings with the ExternalImageId
            if (response.Success) {
                const externalImageId = userInfo.userid;
                params = {
                    CollectionId: collectionId,
                    DetectionAttributes: [],
                    ExternalImageId: externalImageId,
                    Image: {
                        Bytes: faceImageBlob
                    }
                }
                const indexFaceResponse = await rek.indexFaces(params).promise();
                if (!indexFaceResponse ||
                    !indexFaceResponse.FaceRecords ||
                    indexFaceResponse.FaceRecords.length != 1) {
                    response.Message = 'IndexFaces failed';
                    response.RegistrationStatus = 'indexfaces-failed';
                    response.Success = false;
                } else {
                    faceId = indexFaceResponse.FaceRecords[0].Face.FaceId;
                    response.RegistrationStatus = 'done';
                }
            }
            
            // 5. Now update ddb entry w/ face embeddings id, if successful so far
            // If prev failure, then update reg status in ddb
            if (response.Success) {
                const ddbResponse = await updateUserInfo(userInfoTable, userInfo, faceId, response.RegistrationStatus);
                if (!ddbResponse.success) {
                    response.Message = 'UserInfo ddb update failed!';
                    response.RegistrationStatus = 'userinfo-ddb-failed';
                    response.Success = false;
                }
                else {
                    response.Success = true;
                    response.Message = '';
                }
            }
        }
        catch (e) {
            response.Message = e.toString();
            response.RegistrationStatus = 'unknown-error';
            response.Success = false;
            console.log(e);
        }

        return response;
    },

    updateExistingUserPhoto: async function (userInfoAsJson, faceImageDataBase64) {
        const bucket = process.env.STORAGE_IDVIMAGEBUCKET_BUCKETNAME;
        const keyPrefix = "/public/";
        const userInfoTable = process.env.API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME;

        const userInfo = JSON.parse(userInfoAsJson);
        var response = {
            Companyid: userInfo.companyid,
            UserId: userInfo.userid,
            Success: true,
            Message: '',
        };

        const collectionId = await graphqlhelpers.getActiveCollection();
        if(!collectionId) {
            response.Success = false;
            response.Message = "Unable to fetch active collection";
            return response;
        }

        const rek = new Rekognition(), s3client = new S3();

        try {
            // 1. delete face id from collection
            if (userInfo.faceid) {
                var params = {
                    CollectionId: collectionId,
                    FaceIds: [userInfo.faceid]
                };
                const deleteFacesResponse = await rek.deleteFaces(params).promise();
                console.log(deleteFacesResponse);

                if (!deleteFacesResponse ||
                    !deleteFacesResponse.DeletedFaces ||
                    deleteFacesResponse.DeletedFaces.length != 1) {
                    response.Success = false;
                    response.Message = 'Unable to delete face from collection'
                }
            }

            // 2. delete s3 image
            if (userInfo.faceimage && response.Success) {
                params = {
                    Bucket: bucket,
                    Key: keyPrefix + userInfo.faceimage
                };

                const s3DeleteResponse = await s3client.deleteObject(params).promise();
                            console.log(s3DeleteResponse);
            }

            // 3. delete ddb entry
            if (response.Success) {
                var docClient = new DynamoDB.DocumentClient();
                var ddbParams = {
                    TableName: userInfoTable,
                    Key: {
                        "companyid": 'Amazon',
                        "userid": userInfo.userid
                    }
                }
                var ddbDeleteResponse = await docClient.delete(ddbParams).promise();
                console.log(ddbDeleteResponse);
            }
        } catch (e) {
            response.Success = false;
            response.Message = e.toString();
        }

        return response
    },

    deleteUser: async function (userInfoAsJson) {
        const bucket = process.env.STORAGE_IDVIMAGEBUCKET_BUCKETNAME;
        const keyPrefix = "/public/";
        const userInfoTable = process.env.API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME;

        const userInfo = JSON.parse(userInfoAsJson);
        var response = {
            Companyid: userInfo.companyid,
            UserId: userInfo.userid,
            FirstName: userInfo.firstname,
            LastName: userInfo.lastname,
            DOB: userInfo.dob,
            Success: true,
            Message: '',
        };

        const collectionId = await graphqlhelpers.getActiveCollection();
        if(!collectionId) {
            response.Success = false;
            response.Message = "Unable to fetch active collection";
            return response;
        }

        const rek = new Rekognition(), s3client = new S3();

        try {
            // 1. delete face id from collection
            if (userInfo.faceid) {
                var params = {
                    CollectionId: collectionId,
                    FaceIds: [userInfo.faceid]
                };
                const deleteFacesResponse = await rek.deleteFaces(params).promise();
                console.log(deleteFacesResponse);

                if (!deleteFacesResponse ||
                    !deleteFacesResponse.DeletedFaces ||
                    deleteFacesResponse.DeletedFaces.length != 1) {
                    response.Success = false;
                    response.Message = 'Unable to delete face from collection'
                }
            }

            // 2. delete s3 image
            if (userInfo.faceimage && response.Success) {
                params = {
                    Bucket: bucket,
                    Key: keyPrefix + userInfo.faceimage
                };

                const s3DeleteResponse = await s3client.deleteObject(params).promise();
            }

            // 3. delete ddb entry
            if (response.Success) {
                var docClient = new DynamoDB.DocumentClient();
                var ddbParams = {
                    TableName: userInfoTable,
                    Key: {
                        "companyid": 'Amazon',
                        "userid": userInfo.userid
                    }
                }
                var ddbDeleteResponse = await docClient.delete(ddbParams).promise();
                console.log(ddbDeleteResponse);
            }
        } catch (e) {
            response.Success = false;
            response.Message = e.toString();
        }

        return response
    },

    loginUser: async function (imageDataBase64) {

        const rek = new Rekognition();

        var response = {
            Success: false,
            Message: ''
        };

        const collectionId = await graphqlhelpers.getActiveCollection();
        if(!collectionId) {
            response.Success = false;
            response.Message = "Unable to fetch active collection";
            return response;
        }

        var buf = Buffer.from(imageDataBase64, 'base64');
        var params = {
            CollectionId: collectionId,
            FaceMatchThreshold: 95,
            Image: {
                Bytes: buf
            }
        };

        const searchFacesResponse = await rek.searchFacesByImage(params).promise();
        if (!searchFacesResponse ||
            !searchFacesResponse.FaceMatches ||
            searchFacesResponse.FaceMatches.length != 1) {
            response.Success = false;
            response.Message = "Unable to locate user w/ submitted photo";
            return response;
        }

        const faceId = searchFacesResponse.FaceMatches[0].Face.FaceId;
        const userInfo = await graphqlhelpers.getUserInfoByFaceId('Amazon', faceId);
        
        if(userInfo && userInfo.items && userInfo.items.length == 1) {
            response.Message = userInfo.items[0].userid;
            response.Success = true;

            response.Confidence = searchFacesResponse.FaceMatches[0].Face.Confidence;
            response.CompanyId = userInfo.items[0].companyid;
            response.UserId = userInfo.items[0].userid;
            response.FirstName = userInfo.items[0].firstname;
            response.LastName = userInfo.items[0].lastname;
            response.DOB = userInfo.items[0].dob.toString();
            response.RegistrationStatus = userInfo.items[0].registrationstatus;
            response.FaceId = faceId;
            response.FaceImage = userInfo.items[0].faceimage;
            
            return response;
        }
        
        return response;
    },

    detectTextInIdCard: async function (imageDataBase64) {

        const rek = new Rekognition();

        var response = {
            Success: false,
            Message: '',
            DetectedText: []
        };

        var buf = Buffer.from(imageDataBase64, 'base64');

        var params = {
            Image: {
                Bytes: buf
            }
        };
        const detectTextResponse = await rek.detectText(params).promise();
        if (detectTextResponse &&
            detectTextResponse["TextDetections"]) {
            var textDetections = detectTextResponse["TextDetections"];
            for (var i = 0; i < textDetections.length; i++) {
                response.DetectedText.push(textDetections[i].DetectedText);
            }

            response.Success = true;
        } else {
            response.Success = false;
            response.Message = "Unable to extract text"
        }
        
        return response;
    }
}