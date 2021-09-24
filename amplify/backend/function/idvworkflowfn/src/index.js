/* Amplify Params - DO NOT EDIT
	API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT
	API_AMAZONREKOGNITIONIDV_GRAPHQLAPIIDOUTPUT
	API_AMAZONREKOGNITIONIDV_USERINFOTABLE_ARN
	API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME
	AUTH_AMAZONREKOGNITIONIDV6570CBEA_USERPOOLID
	STORAGE_IDVIMAGEBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT
    API_AMAZONREKOGNITIONIDV_GRAPHQLAPIIDOUTPUT
    API_AMAZONREKOGNITIONIDV_IMAGETAGTABLE_ARN
    API_AMAZONREKOGNITIONIDV_IMAGETAGTABLE_NAME
    API_AMAZONREKOGNITIONIDV_INGESTEDIMAGETABLE_ARN
    API_AMAZONREKOGNITIONIDV_INGESTEDIMAGETABLE_NAME
    API_AMAZONREKOGNITIONIDV_USERIMAGETAGTABLE_ARN
    API_AMAZONREKOGNITIONIDV_USERIMAGETAGTABLE_NAME
    API_AMAZONREKOGNITIONIDV_USERINFOTABLE_ARN
    API_AMAZONREKOGNITIONIDV_USERINFOTABLE_NAME
    AUTH_AMAZONREKOGNITIONIDV6570CBEA_USERPOOLID
    ENV
    REGION
    STORAGE_IDVIMAGEBUCKET_BUCKETNAME
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
    AUTH_AMAZONREKOGNITIONIDV6570CBEA_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */

var idvfunctions = require('./idvfunctions');
const { CognitoIdentityServiceProvider, Rekognition, S3 } = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_AMAZONREKOGNITIONIDV6570CBEA_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
    throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
}
const COGNITO_USERNAME_CLAIM_KEY = 'cognito:username';

/**
* Using this as the entry point, you can use a single function to handle many resolvers.
*/
const resolvers = {
    Query: {
        echo: ctx => {
            return ctx.arguments.msg;
        },
        testrek: async (ctx) => {
            return await idvfunctions.testRek(ctx.arguments.bucket, ctx.arguments.imagepath);
        },
        describecollection: async (ctx) => {
            return await idvfunctions.describeCollection(ctx.arguments.collectionId);
        },
        listcollections: async (ctx) => {
            return await idvfunctions.listCollections();
        },
        loginuser: async (ctx) => {
            return await idvfunctions.loginUser(ctx.arguments.imageDataBase64);
        },
        detecttextinidcard: async (ctx) => {
            return await idvfunctions.detectTextInIdCard(ctx.arguments.imageDataBase64);
        },
        moderate: async (ctx) => {
            var params = {
                Image: {
                    S3Object: {
                        Bucket: ctx.arguments.bucket,
                        Name: ctx.arguments.imagepath
                    }
                }
            };
            const rek = new Rekognition(), s3client = new S3();
            try {
                const response = await rek.detectModerationLabels(params).promise();
                if (response) {
                    return response.ModerationLabels;
                } else {
                    return [];
                }
            } catch (e) {
                console.log(e);
                return [];
            }
        },
        me: async ctx => {
            var params = {
                UserPoolId: COGNITO_USERPOOL_ID, /* required */
                Username: ctx.identity.claims[COGNITO_USERNAME_CLAIM_KEY], /* required */
            };
            try {
                // Read more: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
                return await cognitoIdentityServiceProvider.adminGetUser(params).promise();
            } catch (e) {
                throw new Error(`NOT FOUND`);
            }
        }
    },
    Mutation: {
        createcollection: async (ctx) => {
            return await idvfunctions.createCollection(ctx.arguments.collectionId);
        },
        registernewuser: async (ctx) => {
            return await idvfunctions.registerNewUser(ctx.arguments.userInfoAsJson);
        },
        registernewuserwithidcard: async (ctx) => {
            return await idvfunctions.registerNewUserWithIdCard(ctx.arguments.userInfoAsJson, ctx.arguments.faceImageDataBase64, ctx.arguments.idImageDataBase64);
        },
        deleteuser: async (ctx) => {
            return await idvfunctions.deleteUser(ctx.arguments.userInfoAsJson);
        },
    },
}

exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error("Resolver not found.");
};
