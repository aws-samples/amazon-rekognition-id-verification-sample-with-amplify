/* Amplify Params - DO NOT EDIT
	API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT
	API_AMAZONREKOGNITIONIDV_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
  API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT
  API_AMAZONREKOGNITIONIDV_GRAPHQLAPIIDOUTPUT
  API_AMAZONREKOGNITIONIDV_GRAPHQLAPIKEYOUTPUT
  API_AMAZONREKOGNITIONIDV_IMAGETAGTABLE_ARN
  API_AMAZONREKOGNITIONIDV_IMAGETAGTABLE_NAME
  API_AMAZONREKOGNITIONIDV_INGESTEDIMAGETABLE_ARN
  API_AMAZONREKOGNITIONIDV_INGESTEDIMAGETABLE_NAME
  ENV
  REGION
Amplify Params - DO NOT EDIT */// eslint-disable-next-line

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const { S3 } = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;
const appsyncUrl = process.env.API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();
const AWS = require("aws-sdk");
//const apiKey = process.env.API_AMAZONREKOGNITIONIDV_GRAPHQLAPIKEYOUTPUT;
const apiKey = '';

const createIngestedImage = gql`
  mutation CreateIngestedImage(
    $input: CreateIngestedImageInput!
    $condition: ModelIngestedImageConditionInput
  ) {
    createIngestedImage(input: $input, condition: $condition) {
      image
      username
      description
      createdAt
      updatedAt
      tags {
        items {
          image
          tag
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;

async function insertImageWithSigning(event) {

  const params = {
    Bucket: event.Records[0].s3.bucket.name,
    Key: event.Records[0].s3.object.key,
  };

  const s3Client = new S3();
  const s3MetadataResponse = await s3Client.headObject(params).promise();

  const req = new AWS.HttpRequest(appsyncUrl, region);

  const item = {
    input: {
      image: params.Key,
      username: s3MetadataResponse.Metadata.user,
      description: "Image from s3 trigger lambda"
    }
  };

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: print(createIngestedImage),
    operationName: "CreateIngestedImage",
    variables: item
  });

  if (apiKey) {
    req.headers["x-api-key"] = apiKey;
  } else {
    const signer = new AWS.Signers.V4(req, "appsync", true);
    var credentials = new AWS.EnvironmentCredentials('AWS');
    signer.addAuthorization(credentials, AWS.util.date.getDate());
  }

  // const data = await axios({
  //       method: 'post',
  //       url: req.endpoint.href,
  //       data: req.body,
  //       headers: req.headers
  //   });
  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      let data = "";

      result.on("data", (chunk) => {
        data += chunk;
      });

      result.on("end", () => {
        resolve(JSON.parse(data.toString()));
      });
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  return {
    statusCode: 200,
    body: data
  };
}

exports.handler = async function (event) {
  //console.log('Received S3 event:', JSON.stringify(event, null, 2));

  const funcResponse = await insertImageWithSigning(event);
  //const funcResponse = await insertImage(event);
  return funcResponse;
};
