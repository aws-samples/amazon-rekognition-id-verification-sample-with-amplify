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
    },
    Mutation: {
        createcollection: async (ctx) => {
            return await idvfunctions.createCollection(ctx.arguments.collectionId);
        },
        deletecollection: async (ctx) => {
            return await idvfunctions.deleteCollection(ctx.arguments.collectionId);
        },
        registernewuser: async (ctx) => {
            return await idvfunctions.registerNewUser(ctx.arguments.userInfoAsJson);
        },
        registernewuserwithidcard: async (ctx) => {
            return await idvfunctions.registerNewUserWithIdCard(ctx.arguments.userInfoAsJson, ctx.arguments.faceImageDataBase64, ctx.arguments.idImageDataBase64);
        },
        updateexistinguserphoto: async (ctx) => {
            return await idvfunctions.updateExistingUserPhoto(ctx.arguments.userInfoAsJson, ctx.arguments.faceImageDataBase64);
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
