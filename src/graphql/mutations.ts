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
export const registernewuserwithidcard = /* GraphQL */ `
  mutation Registernewuserwithidcard(
    $userInfoAsJson: String
    $faceImageDataBase64: String
    $idImageDataBase64: String
  ) {
    registernewuserwithidcard(
      userInfoAsJson: $userInfoAsJson
      faceImageDataBase64: $faceImageDataBase64
      idImageDataBase64: $idImageDataBase64
    ) {
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
