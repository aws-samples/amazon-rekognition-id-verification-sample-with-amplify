const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const { S3 } = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;
const region = process.env.REGION;
const AWS = require("aws-sdk");

const getConfigEntry = gql`
  query GetConfigEntry($configroot: String!, $configid: String!) {
    getConfigEntry(configroot: $configroot, configid: $configid) {
      configroot
      configid
      value
      createdAt
      updatedAt
    }
  }
`;

const userInfoByFaceId = gql`
  query UserInfoByFaceId(
    $companyid: String
    $faceid: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userInfoByFaceId(
      companyid: $companyid
      faceid: $faceid
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        companyid
        userid
        firstname
        lastname
        dob
        registrationstatus
        faceimage
        faceid
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

function getSignedRequest(appsyncUrl, gqlQuery, opName, variables) {
  const endpoint = new urlParse(appsyncUrl).hostname.toString();

  const req = new AWS.HttpRequest(appsyncUrl, region);

  req.method = "POST";
  req.path = "/graphql";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: print(gqlQuery),
    operationName: opName,
    variables: variables
  });

  const signer = new AWS.Signers.V4(req, "appsync", true);
  var credentials = new AWS.EnvironmentCredentials('AWS');
  signer.addAuthorization(credentials, AWS.util.date.getDate());

  return req;
}

module.exports = {
  getUserInfoByFaceId: async function (companyId, faceId, appsyncUrl) {
    const vars = {
      companyid: companyId,
      faceid: { eq: faceId },
    };

    var req = getSignedRequest(appsyncUrl, userInfoByFaceId, "UserInfoByFaceId", vars);

    // const userInfoResponse = await axios({
    //     method: 'post',
    //     url: appsyncUrl,
    //     data: req.body,
    //     headers: req.headers
    // });

    const { data } = await new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...req, host: req.headers.host }, (result) => {
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

    if (!data) {
      return null;
    }
    else {
      return data.userInfoByFaceId;
    }
  },

  getActiveCollection: async function () {
    const appsyncUrl = process.env.API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT;
    const vars = {
      configroot: 'config',
      configid: 'defaultcollection',
    };

    var req = getSignedRequest(appsyncUrl, getConfigEntry, "GetConfigEntry", vars);

    const { data } = await new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...req, host: req.headers.host }, (result) => {
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

    if (!data ||
      !data.getConfigEntry) {
      return null;
    }
    else {
      return data.getConfigEntry.value;
    }
  }
}