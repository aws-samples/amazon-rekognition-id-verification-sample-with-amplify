/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createcollection = /* GraphQL */ `
  mutation Createcollection($collectionId: String) {
    createcollection(collectionId: $collectionId) {
      CollectionId
      Arn
      Success
      Message
    }
  }
`;
export const deletecollection = /* GraphQL */ `
  mutation Deletecollection($collectionId: String) {
    deletecollection(collectionId: $collectionId) {
      CollectionId
      Success
      Message
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
export const updateexistinguserphoto = /* GraphQL */ `
  mutation Updateexistinguserphoto(
    $userInfoAsJson: String
    $faceImageDataBase64: String
  ) {
    updateexistinguserphoto(
      userInfoAsJson: $userInfoAsJson
      faceImageDataBase64: $faceImageDataBase64
    ) {
      Success
      Message
      CompanyId
      UserId
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
export const createConfigEntry = /* GraphQL */ `
  mutation CreateConfigEntry(
    $input: CreateConfigEntryInput!
    $condition: ModelConfigEntryConditionInput
  ) {
    createConfigEntry(input: $input, condition: $condition) {
      configroot
      configid
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateConfigEntry = /* GraphQL */ `
  mutation UpdateConfigEntry(
    $input: UpdateConfigEntryInput!
    $condition: ModelConfigEntryConditionInput
  ) {
    updateConfigEntry(input: $input, condition: $condition) {
      configroot
      configid
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteConfigEntry = /* GraphQL */ `
  mutation DeleteConfigEntry(
    $input: DeleteConfigEntryInput!
    $condition: ModelConfigEntryConditionInput
  ) {
    deleteConfigEntry(input: $input, condition: $condition) {
      configroot
      configid
      value
      createdAt
      updatedAt
    }
  }
`;
export const createCachedCollectionList = /* GraphQL */ `
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
export const updateCachedCollectionList = /* GraphQL */ `
  mutation UpdateCachedCollectionList(
    $input: UpdateCachedCollectionListInput!
    $condition: ModelCachedCollectionListConditionInput
  ) {
    updateCachedCollectionList(input: $input, condition: $condition) {
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
export const deleteCachedCollectionList = /* GraphQL */ `
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
