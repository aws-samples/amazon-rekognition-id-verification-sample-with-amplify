/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCollectionResponse = {
  __typename: "CreateCollectionResponse",
  CollectionId?: string | null,
  Arn?: string | null,
  Success?: boolean | null,
  Message?: string | null,
};

export type DeleteCollectionResponse = {
  __typename: "DeleteCollectionResponse",
  CollectionId?: string | null,
  Success?: boolean | null,
  Message?: string | null,
};

export type RegisterNewUserResponse = {
  __typename: "RegisterNewUserResponse",
  Success?: boolean | null,
  Message?: string | null,
  CompanyId?: string | null,
  UserId?: string | null,
  RegistrationStatus?: string | null,
};

export type UpdateUserPhotoResponse = {
  __typename: "UpdateUserPhotoResponse",
  Success?: boolean | null,
  Message?: string | null,
  CompanyId?: string | null,
  UserId?: string | null,
};

export type DeleteUserResponse = {
  __typename: "DeleteUserResponse",
  Success?: boolean | null,
  Message?: string | null,
  CompanyId?: string | null,
  UserId?: string | null,
  FirstName?: string | null,
  LastName?: string | null,
  DOB?: string | null,
};

export type CreateUserInfoInput = {
  companyid: string,
  userid: string,
  firstname: string,
  lastname: string,
  dob: string,
  registrationstatus: string,
  faceimage?: string | null,
  faceid?: string | null,
  description?: string | null,
};

export type ModelUserInfoConditionInput = {
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  registrationstatus?: ModelStringInput | null,
  faceimage?: ModelStringInput | null,
  faceid?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelUserInfoConditionInput | null > | null,
  or?: Array< ModelUserInfoConditionInput | null > | null,
  not?: ModelUserInfoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UserInfo = {
  __typename: "UserInfo",
  companyid: string,
  userid: string,
  firstname: string,
  lastname: string,
  dob: string,
  registrationstatus: string,
  faceimage?: string | null,
  faceid?: string | null,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInfoInput = {
  companyid: string,
  userid: string,
  firstname?: string | null,
  lastname?: string | null,
  dob?: string | null,
  registrationstatus?: string | null,
  faceimage?: string | null,
  faceid?: string | null,
  description?: string | null,
};

export type DeleteUserInfoInput = {
  companyid: string,
  userid: string,
};

export type CreateConfigEntryInput = {
  configroot: string,
  configid: string,
  value: string,
};

export type ModelConfigEntryConditionInput = {
  value?: ModelStringInput | null,
  and?: Array< ModelConfigEntryConditionInput | null > | null,
  or?: Array< ModelConfigEntryConditionInput | null > | null,
  not?: ModelConfigEntryConditionInput | null,
};

export type ConfigEntry = {
  __typename: "ConfigEntry",
  configroot: string,
  configid: string,
  value: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateConfigEntryInput = {
  configroot: string,
  configid: string,
  value?: string | null,
};

export type DeleteConfigEntryInput = {
  configroot: string,
  configid: string,
};

export type CreateCachedCollectionListInput = {
  configroot: string,
  collectionid: string,
  arn: string,
  created: string,
  facemodel: string,
};

export type ModelCachedCollectionListConditionInput = {
  arn?: ModelStringInput | null,
  created?: ModelStringInput | null,
  facemodel?: ModelStringInput | null,
  and?: Array< ModelCachedCollectionListConditionInput | null > | null,
  or?: Array< ModelCachedCollectionListConditionInput | null > | null,
  not?: ModelCachedCollectionListConditionInput | null,
};

export type CachedCollectionList = {
  __typename: "CachedCollectionList",
  configroot: string,
  collectionid: string,
  arn: string,
  created: string,
  facemodel: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCachedCollectionListInput = {
  configroot: string,
  collectionid: string,
  arn?: string | null,
  created?: string | null,
  facemodel?: string | null,
};

export type DeleteCachedCollectionListInput = {
  configroot: string,
  collectionid: string,
};

export type CollectionResponse = {
  __typename: "CollectionResponse",
  CollectionId?: string | null,
  Arn?: string | null,
};

export type DescribeCollectionResponse = {
  __typename: "DescribeCollectionResponse",
  FaceCount?: number | null,
  FaceModelVersion?: string | null,
  CollectionARN?: string | null,
  CreationTimestamp?: string | null,
  CollectionId?: string | null,
};

export type LoginUserResponse = {
  __typename: "LoginUserResponse",
  Success?: boolean | null,
  Message?: string | null,
  Confidence?: number | null,
  CompanyId?: string | null,
  UserId?: string | null,
  FirstName?: string | null,
  LastName?: string | null,
  DOB?: string | null,
  RegistrationStatus?: string | null,
  FaceId?: string | null,
  FaceImage?: string | null,
};

export type DetectTextResponse = {
  __typename: "DetectTextResponse",
  Success?: boolean | null,
  Message?: string | null,
  DetectedText?: Array< string | null > | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserInfoFilterInput = {
  companyid?: ModelStringInput | null,
  userid?: ModelStringInput | null,
  firstname?: ModelStringInput | null,
  lastname?: ModelStringInput | null,
  dob?: ModelStringInput | null,
  registrationstatus?: ModelStringInput | null,
  faceimage?: ModelStringInput | null,
  faceid?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelUserInfoFilterInput | null > | null,
  or?: Array< ModelUserInfoFilterInput | null > | null,
  not?: ModelUserInfoFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelUserInfoConnection = {
  __typename: "ModelUserInfoConnection",
  items?:  Array<UserInfo | null > | null,
  nextToken?: string | null,
};

export type ModelConfigEntryFilterInput = {
  configroot?: ModelStringInput | null,
  configid?: ModelStringInput | null,
  value?: ModelStringInput | null,
  and?: Array< ModelConfigEntryFilterInput | null > | null,
  or?: Array< ModelConfigEntryFilterInput | null > | null,
  not?: ModelConfigEntryFilterInput | null,
};

export type ModelConfigEntryConnection = {
  __typename: "ModelConfigEntryConnection",
  items?:  Array<ConfigEntry | null > | null,
  nextToken?: string | null,
};

export type ModelCachedCollectionListFilterInput = {
  configroot?: ModelStringInput | null,
  collectionid?: ModelStringInput | null,
  arn?: ModelStringInput | null,
  created?: ModelStringInput | null,
  facemodel?: ModelStringInput | null,
  and?: Array< ModelCachedCollectionListFilterInput | null > | null,
  or?: Array< ModelCachedCollectionListFilterInput | null > | null,
  not?: ModelCachedCollectionListFilterInput | null,
};

export type ModelCachedCollectionListConnection = {
  __typename: "ModelCachedCollectionListConnection",
  items?:  Array<CachedCollectionList | null > | null,
  nextToken?: string | null,
};

export type CreatecollectionMutationVariables = {
  collectionId?: string | null,
};

export type CreatecollectionMutation = {
  createcollection?:  {
    __typename: "CreateCollectionResponse",
    CollectionId?: string | null,
    Arn?: string | null,
    Success?: boolean | null,
    Message?: string | null,
  } | null,
};

export type DeletecollectionMutationVariables = {
  collectionId?: string | null,
};

export type DeletecollectionMutation = {
  deletecollection?:  {
    __typename: "DeleteCollectionResponse",
    CollectionId?: string | null,
    Success?: boolean | null,
    Message?: string | null,
  } | null,
};

export type RegisternewuserMutationVariables = {
  userInfoAsJson?: string | null,
};

export type RegisternewuserMutation = {
  registernewuser?:  {
    __typename: "RegisterNewUserResponse",
    Success?: boolean | null,
    Message?: string | null,
    CompanyId?: string | null,
    UserId?: string | null,
    RegistrationStatus?: string | null,
  } | null,
};

export type RegisternewuserwithidcardMutationVariables = {
  userInfoAsJson?: string | null,
  faceImageDataBase64?: string | null,
  idImageDataBase64?: string | null,
};

export type RegisternewuserwithidcardMutation = {
  registernewuserwithidcard?:  {
    __typename: "RegisterNewUserResponse",
    Success?: boolean | null,
    Message?: string | null,
    CompanyId?: string | null,
    UserId?: string | null,
    RegistrationStatus?: string | null,
  } | null,
};

export type UpdateexistinguserphotoMutationVariables = {
  userInfoAsJson?: string | null,
  faceImageDataBase64?: string | null,
};

export type UpdateexistinguserphotoMutation = {
  updateexistinguserphoto?:  {
    __typename: "UpdateUserPhotoResponse",
    Success?: boolean | null,
    Message?: string | null,
    CompanyId?: string | null,
    UserId?: string | null,
  } | null,
};

export type DeleteuserMutationVariables = {
  userInfoAsJson?: string | null,
};

export type DeleteuserMutation = {
  deleteuser?:  {
    __typename: "DeleteUserResponse",
    Success?: boolean | null,
    Message?: string | null,
    CompanyId?: string | null,
    UserId?: string | null,
    FirstName?: string | null,
    LastName?: string | null,
    DOB?: string | null,
  } | null,
};

export type CreateUserInfoMutationVariables = {
  input: CreateUserInfoInput,
  condition?: ModelUserInfoConditionInput | null,
};

export type CreateUserInfoMutation = {
  createUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserInfoMutationVariables = {
  input: UpdateUserInfoInput,
  condition?: ModelUserInfoConditionInput | null,
};

export type UpdateUserInfoMutation = {
  updateUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserInfoMutationVariables = {
  input: DeleteUserInfoInput,
  condition?: ModelUserInfoConditionInput | null,
};

export type DeleteUserInfoMutation = {
  deleteUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateConfigEntryMutationVariables = {
  input: CreateConfigEntryInput,
  condition?: ModelConfigEntryConditionInput | null,
};

export type CreateConfigEntryMutation = {
  createConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateConfigEntryMutationVariables = {
  input: UpdateConfigEntryInput,
  condition?: ModelConfigEntryConditionInput | null,
};

export type UpdateConfigEntryMutation = {
  updateConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteConfigEntryMutationVariables = {
  input: DeleteConfigEntryInput,
  condition?: ModelConfigEntryConditionInput | null,
};

export type DeleteConfigEntryMutation = {
  deleteConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCachedCollectionListMutationVariables = {
  input: CreateCachedCollectionListInput,
  condition?: ModelCachedCollectionListConditionInput | null,
};

export type CreateCachedCollectionListMutation = {
  createCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCachedCollectionListMutationVariables = {
  input: UpdateCachedCollectionListInput,
  condition?: ModelCachedCollectionListConditionInput | null,
};

export type UpdateCachedCollectionListMutation = {
  updateCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCachedCollectionListMutationVariables = {
  input: DeleteCachedCollectionListInput,
  condition?: ModelCachedCollectionListConditionInput | null,
};

export type DeleteCachedCollectionListMutation = {
  deleteCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListcollectionsQueryVariables = {
  param?: string | null,
};

export type ListcollectionsQuery = {
  listcollections?:  Array< {
    __typename: "CollectionResponse",
    CollectionId?: string | null,
    Arn?: string | null,
  } | null > | null,
};

export type DescribecollectionQueryVariables = {
  collectionId?: string | null,
};

export type DescribecollectionQuery = {
  describecollection?:  {
    __typename: "DescribeCollectionResponse",
    FaceCount?: number | null,
    FaceModelVersion?: string | null,
    CollectionARN?: string | null,
    CreationTimestamp?: string | null,
    CollectionId?: string | null,
  } | null,
};

export type LoginuserQueryVariables = {
  imageDataBase64?: string | null,
};

export type LoginuserQuery = {
  loginuser?:  {
    __typename: "LoginUserResponse",
    Success?: boolean | null,
    Message?: string | null,
    Confidence?: number | null,
    CompanyId?: string | null,
    UserId?: string | null,
    FirstName?: string | null,
    LastName?: string | null,
    DOB?: string | null,
    RegistrationStatus?: string | null,
    FaceId?: string | null,
    FaceImage?: string | null,
  } | null,
};

export type DetecttextinidcardQueryVariables = {
  imageDataBase64?: string | null,
};

export type DetecttextinidcardQuery = {
  detecttextinidcard?:  {
    __typename: "DetectTextResponse",
    Success?: boolean | null,
    Message?: string | null,
    DetectedText?: Array< string | null > | null,
  } | null,
};

export type GetUserInfoQueryVariables = {
  companyid: string,
  userid: string,
};

export type GetUserInfoQuery = {
  getUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserInfosQueryVariables = {
  companyid?: string | null,
  userid?: ModelStringKeyConditionInput | null,
  filter?: ModelUserInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserInfosQuery = {
  listUserInfos?:  {
    __typename: "ModelUserInfoConnection",
    items?:  Array< {
      __typename: "UserInfo",
      companyid: string,
      userid: string,
      firstname: string,
      lastname: string,
      dob: string,
      registrationstatus: string,
      faceimage?: string | null,
      faceid?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type UserInfoByFaceIdQueryVariables = {
  companyid?: string | null,
  faceid?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserInfoByFaceIdQuery = {
  userInfoByFaceId?:  {
    __typename: "ModelUserInfoConnection",
    items?:  Array< {
      __typename: "UserInfo",
      companyid: string,
      userid: string,
      firstname: string,
      lastname: string,
      dob: string,
      registrationstatus: string,
      faceimage?: string | null,
      faceid?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type UserInfoByRegStatusQueryVariables = {
  companyid?: string | null,
  registrationstatus?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserInfoByRegStatusQuery = {
  userInfoByRegStatus?:  {
    __typename: "ModelUserInfoConnection",
    items?:  Array< {
      __typename: "UserInfo",
      companyid: string,
      userid: string,
      firstname: string,
      lastname: string,
      dob: string,
      registrationstatus: string,
      faceimage?: string | null,
      faceid?: string | null,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetConfigEntryQueryVariables = {
  configroot: string,
  configid: string,
};

export type GetConfigEntryQuery = {
  getConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListConfigEntriesQueryVariables = {
  configroot?: string | null,
  configid?: ModelStringKeyConditionInput | null,
  filter?: ModelConfigEntryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListConfigEntriesQuery = {
  listConfigEntries?:  {
    __typename: "ModelConfigEntryConnection",
    items?:  Array< {
      __typename: "ConfigEntry",
      configroot: string,
      configid: string,
      value: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetCachedCollectionListQueryVariables = {
  configroot: string,
  collectionid: string,
};

export type GetCachedCollectionListQuery = {
  getCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCachedCollectionListsQueryVariables = {
  configroot?: string | null,
  collectionid?: ModelStringKeyConditionInput | null,
  filter?: ModelCachedCollectionListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCachedCollectionListsQuery = {
  listCachedCollectionLists?:  {
    __typename: "ModelCachedCollectionListConnection",
    items?:  Array< {
      __typename: "CachedCollectionList",
      configroot: string,
      collectionid: string,
      arn: string,
      created: string,
      facemodel: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserInfoSubscription = {
  onCreateUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserInfoSubscription = {
  onUpdateUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserInfoSubscription = {
  onDeleteUserInfo?:  {
    __typename: "UserInfo",
    companyid: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    registrationstatus: string,
    faceimage?: string | null,
    faceid?: string | null,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateConfigEntrySubscription = {
  onCreateConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateConfigEntrySubscription = {
  onUpdateConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteConfigEntrySubscription = {
  onDeleteConfigEntry?:  {
    __typename: "ConfigEntry",
    configroot: string,
    configid: string,
    value: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCachedCollectionListSubscription = {
  onCreateCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCachedCollectionListSubscription = {
  onUpdateCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCachedCollectionListSubscription = {
  onDeleteCachedCollectionList?:  {
    __typename: "CachedCollectionList",
    configroot: string,
    collectionid: string,
    arn: string,
    created: string,
    facemodel: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
