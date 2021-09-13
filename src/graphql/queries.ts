/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const echo = /* GraphQL */ `
  query Echo($msg: String) {
    echo(msg: $msg)
  }
`;
export const testrek = /* GraphQL */ `
  query Testrek($bucket: String, $imagepath: String) {
    testrek(bucket: $bucket, imagepath: $imagepath) {
      ParentName
      Name
      Confidence
    }
  }
`;
export const listcollections = /* GraphQL */ `
  query Listcollections($param: String) {
    listcollections(param: $param) {
      CollectionId
      Arn
    }
  }
`;
export const describecollection = /* GraphQL */ `
  query Describecollection($collectionId: String) {
    describecollection(collectionId: $collectionId) {
      FaceCount
      FaceModelVersion
      CollectionARN
      CreationTimestamp
      CollectionId
    }
  }
`;
export const loginuser = /* GraphQL */ `
  query Loginuser($imageDataBase64: String) {
    loginuser(imageDataBase64: $imageDataBase64) {
      Success
      Message
      Confidence
      CompanyId
      UserId
      FirstName
      LastName
      DOB
      RegistrationStatus
      FaceId
      FaceImage
    }
  }
`;
export const getIngestedImage = /* GraphQL */ `
  query GetIngestedImage($username: String!, $image: String!) {
    getIngestedImage(username: $username, image: $image) {
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
export const listIngestedImages = /* GraphQL */ `
  query ListIngestedImages(
    $username: String
    $image: ModelStringKeyConditionInput
    $filter: ModelIngestedImageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listIngestedImages(
      username: $username
      image: $image
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        image
        username
        description
        createdAt
        updatedAt
        tags {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getImageTag = /* GraphQL */ `
  query GetImageTag($tag: String!, $image: String!) {
    getImageTag(tag: $tag, image: $image) {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const listImageTags = /* GraphQL */ `
  query ListImageTags(
    $tag: String
    $image: ModelStringKeyConditionInput
    $filter: ModelImageTagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listImageTags(
      tag: $tag
      image: $image
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        image
        tag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tagsByImage = /* GraphQL */ `
  query TagsByImage(
    $image: String
    $tag: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelImageTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByImage(
      image: $image
      tag: $tag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        image
        tag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserImageTag = /* GraphQL */ `
  query GetUserImageTag($tag: String!, $username: String!, $image: String!) {
    getUserImageTag(tag: $tag, username: $username, image: $image) {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const listUserImageTags = /* GraphQL */ `
  query ListUserImageTags(
    $tag: String
    $usernameImage: ModelUserImageTagPrimaryCompositeKeyConditionInput
    $filter: ModelUserImageTagFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserImageTags(
      tag: $tag
      usernameImage: $usernameImage
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        username
        image
        tag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const tagsByUserImage = /* GraphQL */ `
  query TagsByUserImage(
    $username: String
    $imageTag: ModelUserImageTagTagsByUserImageCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserImageTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tagsByUserImage(
      username: $username
      imageTag: $imageTag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        username
        image
        tag
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserInfo = /* GraphQL */ `
  query GetUserInfo($companyid: String!, $userid: String!) {
    getUserInfo(companyid: $companyid, userid: $userid) {
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
  }
`;
export const listUserInfos = /* GraphQL */ `
  query ListUserInfos(
    $companyid: String
    $userid: ModelStringKeyConditionInput
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUserInfos(
      companyid: $companyid
      userid: $userid
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
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
export const userInfoByFaceId = /* GraphQL */ `
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
export const userInfoByRegStatus = /* GraphQL */ `
  query UserInfoByRegStatus(
    $companyid: String
    $registrationstatus: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userInfoByRegStatus(
      companyid: $companyid
      registrationstatus: $registrationstatus
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
