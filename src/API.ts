/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCollectionResponse = {
  __typename: "CreateCollectionResponse",
  CollectionId?: string | null,
  Arn?: string | null,
};

export type RegisterNewUserResponse = {
  __typename: "RegisterNewUserResponse",
  Success?: boolean | null,
  Message?: string | null,
  CompanyId?: string | null,
  UserId?: string | null,
  RegistrationStatus?: string | null,
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

export type CreatecollectionMutationVariables = {
  collectionId?: string | null,
};

export type CreatecollectionMutation = {
  createcollection?:  {
    __typename: "CreateCollectionResponse",
    CollectionId?: string | null,
    Arn?: string | null,
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
