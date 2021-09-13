/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createcollection = /* GraphQL */ `
  mutation Createcollection($collectionId: String) {
    createcollection(collectionId: $collectionId) {
      CollectionId
      Arn
    }
  }
`;
export const registernewuser = /* GraphQL */ `
  mutation Registernewuser($userInfoAsJson: String) {
    registernewuser(userInfoAsJson: $userInfoAsJson) {
      Success
      Message
      CompanyId
      UserId
      RegistrationStatus
    }
  }
`;
export const deleteuser = /* GraphQL */ `
  mutation Deleteuser($userInfoAsJson: String) {
    deleteuser(userInfoAsJson: $userInfoAsJson) {
      Success
      Message
      CompanyId
      UserId
      FirstName
      LastName
      DOB
    }
  }
`;
export const createIngestedImage = /* GraphQL */ `
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
export const updateIngestedImage = /* GraphQL */ `
  mutation UpdateIngestedImage(
    $input: UpdateIngestedImageInput!
    $condition: ModelIngestedImageConditionInput
  ) {
    updateIngestedImage(input: $input, condition: $condition) {
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
export const deleteIngestedImage = /* GraphQL */ `
  mutation DeleteIngestedImage(
    $input: DeleteIngestedImageInput!
    $condition: ModelIngestedImageConditionInput
  ) {
    deleteIngestedImage(input: $input, condition: $condition) {
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
export const createImageTag = /* GraphQL */ `
  mutation CreateImageTag(
    $input: CreateImageTagInput!
    $condition: ModelImageTagConditionInput
  ) {
    createImageTag(input: $input, condition: $condition) {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const updateImageTag = /* GraphQL */ `
  mutation UpdateImageTag(
    $input: UpdateImageTagInput!
    $condition: ModelImageTagConditionInput
  ) {
    updateImageTag(input: $input, condition: $condition) {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const deleteImageTag = /* GraphQL */ `
  mutation DeleteImageTag(
    $input: DeleteImageTagInput!
    $condition: ModelImageTagConditionInput
  ) {
    deleteImageTag(input: $input, condition: $condition) {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const createUserImageTag = /* GraphQL */ `
  mutation CreateUserImageTag(
    $input: CreateUserImageTagInput!
    $condition: ModelUserImageTagConditionInput
  ) {
    createUserImageTag(input: $input, condition: $condition) {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const updateUserImageTag = /* GraphQL */ `
  mutation UpdateUserImageTag(
    $input: UpdateUserImageTagInput!
    $condition: ModelUserImageTagConditionInput
  ) {
    updateUserImageTag(input: $input, condition: $condition) {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserImageTag = /* GraphQL */ `
  mutation DeleteUserImageTag(
    $input: DeleteUserImageTagInput!
    $condition: ModelUserImageTagConditionInput
  ) {
    deleteUserImageTag(input: $input, condition: $condition) {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const createUserInfo = /* GraphQL */ `
  mutation CreateUserInfo(
    $input: CreateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    createUserInfo(input: $input, condition: $condition) {
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
export const updateUserInfo = /* GraphQL */ `
  mutation UpdateUserInfo(
    $input: UpdateUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    updateUserInfo(input: $input, condition: $condition) {
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
export const deleteUserInfo = /* GraphQL */ `
  mutation DeleteUserInfo(
    $input: DeleteUserInfoInput!
    $condition: ModelUserInfoConditionInput
  ) {
    deleteUserInfo(input: $input, condition: $condition) {
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
