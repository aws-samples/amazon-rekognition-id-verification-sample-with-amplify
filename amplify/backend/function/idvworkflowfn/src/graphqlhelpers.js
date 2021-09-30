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

const createCachedCollectionList = gql`
  mutation CreateCachedCollectionList(
    $input: CreateCachedCollectionListInput!
    $condition: ModelCachedCollectionListConditionInput
  ) {
    createCachedCollectionList(input: $input, condition: $condition) {
      configroot
      collectionid
      arn
      created
      facemodel
      createdAt
      updatedAt
    }
  }
`;

const deleteCachedCollectionList = gql`
  mutation DeleteCachedCollectionList(
    $input: DeleteCachedCollectionListInput!
    $condition: ModelCachedCollectionListConditionInput
  ) {
    deleteCachedCollectionList(input: $input, condition: $condition) {
      configroot
      collectionid
      arn
      created
      facemodel
      createdAt
      updatedAt
    }
  }
`;

const listCachedCollectionLists = gql`
  query ListCachedCollectionLists(
    $configroot: String
    $collectionid: ModelStringKeyConditionInput
    $filter: ModelCachedCollectionListFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCachedCollectionLists(
      configroot: $configroot
      collectionid: $collectionid
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        configroot
        collectionid
        arn
        created
        facemodel
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

async function issueGQL(gqlQuery, opName, variables) {
  const appsyncUrl = process.env.API_AMAZONREKOGNITIONIDV_GRAPHQLAPIENDPOINTOUTPUT;
  var req = getSignedRequest(appsyncUrl, gqlQuery, opName, variables);

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
      
      result.on("error", (error) => {
        console.log("In result error handler");
        console.log(error);
      });
    });
    
    httpRequest.on("error", (error) => {
      console.log("In request error handler");
      console.log(error);
    });

    httpRequest.write(req.body);
    httpRequest.end();
  });

  return data;
}

module.exports = {
  getUserInfoByFaceId: async function (companyId, faceId) {
    const vars = {
      companyid: companyId,
      faceid: { eq: faceId },
    };

    var data = await issueGQL(userInfoByFaceId, "UserInfoByFaceId", vars);

    if (!data) {
      return null;
    }
    else {
      return data.userInfoByFaceId;
    }
  },

  getActiveCollection: async function () {
    const vars = {
      configroot: 'config',
      configid: 'defaultcollection',
    };

    var data = await issueGQL(getConfigEntry, "GetConfigEntry", vars);

    if (!data ||
      !data.getConfigEntry) {
      return null;
    }
    else {
      return data.getConfigEntry.value;
    }
  },

  createCachedCollection: async function (collectionEntry) {

    const input = {
      configroot: 'cachedcollectionlist',
      collectionid: collectionEntry.CollectionId,
      arn: collectionEntry.CollectionARN.replace(":", "-").replace("/", "-"),
      created: "2021-09-29", //Date.parse(collectionEntry.CreationTimestamp),
      facemodel: collectionEntry.FaceModelVersion
    };

    var response = {
      Success: false,
      Message: ''
    };

    var data = await issueGQL(createCachedCollectionList, "CreateCachedCollectionList", { input: input });

    if (!data ||
      !data.createCachedCollectionList ||
      !data.createCachedCollectionList.collectionid) {
      response.Success = false;
      response.Message = "Unable to create cached collection entry";
    }
    else {
      response.Success = true;
    }

    return response;
  },

  deleteCachedCollection: async function (collectionId) {
    const input = {
      configroot: 'cachedcollectionlist',
      collectionid: collectionId
    };

    var response = {
      Success: false,
      Message: ''
    };

    var data = await issueGQL(deleteCachedCollectionList, "DeleteCachedCollectionList", { input: input });

    if (!data ||
      !data.deleteCachedCollectionList ||
      !data.deleteCachedCollectionList.collectionid) {
      response.Success = false;
      response.Message = "Unable to delete cached collection entry";
    }
    else {
      response.Success = true;
    }

    return response;
  }
}