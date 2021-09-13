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

export type CreateIngestedImageInput = {
  image: string,
  username: string,
  description?: string | null,
};

export type ModelIngestedImageConditionInput = {
  description?: ModelStringInput | null,
  and?: Array< ModelIngestedImageConditionInput | null > | null,
  or?: Array< ModelIngestedImageConditionInput | null > | null,
  not?: ModelIngestedImageConditionInput | null,
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

export type IngestedImage = {
  __typename: "IngestedImage",
  image: string,
  username: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
  tags?: ModelImageTagConnection | null,
};

export type ModelImageTagConnection = {
  __typename: "ModelImageTagConnection",
  items?:  Array<ImageTag | null > | null,
  nextToken?: string | null,
};

export type ImageTag = {
  __typename: "ImageTag",
  image: string,
  tag: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateIngestedImageInput = {
  image: string,
  username: string,
  description?: string | null,
};

export type DeleteIngestedImageInput = {
  username: string,
  image: string,
};

export type CreateImageTagInput = {
  image: string,
  tag: string,
};

export type ModelImageTagConditionInput = {
  and?: Array< ModelImageTagConditionInput | null > | null,
  or?: Array< ModelImageTagConditionInput | null > | null,
  not?: ModelImageTagConditionInput | null,
};

export type UpdateImageTagInput = {
  image: string,
  tag: string,
};

export type DeleteImageTagInput = {
  tag: string,
  image: string,
};

export type CreateUserImageTagInput = {
  username: string,
  image: string,
  tag: string,
};

export type ModelUserImageTagConditionInput = {
  and?: Array< ModelUserImageTagConditionInput | null > | null,
  or?: Array< ModelUserImageTagConditionInput | null > | null,
  not?: ModelUserImageTagConditionInput | null,
};

export type UserImageTag = {
  __typename: "UserImageTag",
  username: string,
  image: string,
  tag: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserImageTagInput = {
  username: string,
  image: string,
  tag: string,
};

export type DeleteUserImageTagInput = {
  tag: string,
  username: string,
  image: string,
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

export type ModerationLabel = {
  __typename: "ModerationLabel",
  ParentName?: string | null,
  Name?: string | null,
  Confidence?: number | null,
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

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelIngestedImageFilterInput = {
  image?: ModelStringInput | null,
  username?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelIngestedImageFilterInput | null > | null,
  or?: Array< ModelIngestedImageFilterInput | null > | null,
  not?: ModelIngestedImageFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelIngestedImageConnection = {
  __typename: "ModelIngestedImageConnection",
  items?:  Array<IngestedImage | null > | null,
  nextToken?: string | null,
};

export type ModelImageTagFilterInput = {
  image?: ModelStringInput | null,
  tag?: ModelStringInput | null,
  and?: Array< ModelImageTagFilterInput | null > | null,
  or?: Array< ModelImageTagFilterInput | null > | null,
  not?: ModelImageTagFilterInput | null,
};

export type ModelUserImageTagPrimaryCompositeKeyConditionInput = {
  eq?: ModelUserImageTagPrimaryCompositeKeyInput | null,
  le?: ModelUserImageTagPrimaryCompositeKeyInput | null,
  lt?: ModelUserImageTagPrimaryCompositeKeyInput | null,
  ge?: ModelUserImageTagPrimaryCompositeKeyInput | null,
  gt?: ModelUserImageTagPrimaryCompositeKeyInput | null,
  between?: Array< ModelUserImageTagPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelUserImageTagPrimaryCompositeKeyInput | null,
};

export type ModelUserImageTagPrimaryCompositeKeyInput = {
  username?: string | null,
  image?: string | null,
};

export type ModelUserImageTagFilterInput = {
  username?: ModelStringInput | null,
  image?: ModelStringInput | null,
  tag?: ModelStringInput | null,
  and?: Array< ModelUserImageTagFilterInput | null > | null,
  or?: Array< ModelUserImageTagFilterInput | null > | null,
  not?: ModelUserImageTagFilterInput | null,
};

export type ModelUserImageTagConnection = {
  __typename: "ModelUserImageTagConnection",
  items?:  Array<UserImageTag | null > | null,
  nextToken?: string | null,
};

export type ModelUserImageTagTagsByUserImageCompositeKeyConditionInput = {
  eq?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
  le?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
  lt?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
  ge?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
  gt?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
  between?: Array< ModelUserImageTagTagsByUserImageCompositeKeyInput | null > | null,
  beginsWith?: ModelUserImageTagTagsByUserImageCompositeKeyInput | null,
};

export type ModelUserImageTagTagsByUserImageCompositeKeyInput = {
  image?: string | null,
  tag?: string | null,
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

export type CreateIngestedImageMutationVariables = {
  input: CreateIngestedImageInput,
  condition?: ModelIngestedImageConditionInput | null,
};

export type CreateIngestedImageMutation = {
  createIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateIngestedImageMutationVariables = {
  input: UpdateIngestedImageInput,
  condition?: ModelIngestedImageConditionInput | null,
};

export type UpdateIngestedImageMutation = {
  updateIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteIngestedImageMutationVariables = {
  input: DeleteIngestedImageInput,
  condition?: ModelIngestedImageConditionInput | null,
};

export type DeleteIngestedImageMutation = {
  deleteIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateImageTagMutationVariables = {
  input: CreateImageTagInput,
  condition?: ModelImageTagConditionInput | null,
};

export type CreateImageTagMutation = {
  createImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateImageTagMutationVariables = {
  input: UpdateImageTagInput,
  condition?: ModelImageTagConditionInput | null,
};

export type UpdateImageTagMutation = {
  updateImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteImageTagMutationVariables = {
  input: DeleteImageTagInput,
  condition?: ModelImageTagConditionInput | null,
};

export type DeleteImageTagMutation = {
  deleteImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserImageTagMutationVariables = {
  input: CreateUserImageTagInput,
  condition?: ModelUserImageTagConditionInput | null,
};

export type CreateUserImageTagMutation = {
  createUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserImageTagMutationVariables = {
  input: UpdateUserImageTagInput,
  condition?: ModelUserImageTagConditionInput | null,
};

export type UpdateUserImageTagMutation = {
  updateUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserImageTagMutationVariables = {
  input: DeleteUserImageTagInput,
  condition?: ModelUserImageTagConditionInput | null,
};

export type DeleteUserImageTagMutation = {
  deleteUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
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

export type EchoQueryVariables = {
  msg?: string | null,
};

export type EchoQuery = {
  echo?: string | null,
};

export type TestrekQueryVariables = {
  bucket?: string | null,
  imagepath?: string | null,
};

export type TestrekQuery = {
  testrek?:  Array< {
    __typename: "ModerationLabel",
    ParentName?: string | null,
    Name?: string | null,
    Confidence?: number | null,
  } | null > | null,
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

export type GetIngestedImageQueryVariables = {
  username: string,
  image: string,
};

export type GetIngestedImageQuery = {
  getIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListIngestedImagesQueryVariables = {
  username?: string | null,
  image?: ModelStringKeyConditionInput | null,
  filter?: ModelIngestedImageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListIngestedImagesQuery = {
  listIngestedImages?:  {
    __typename: "ModelIngestedImageConnection",
    items?:  Array< {
      __typename: "IngestedImage",
      image: string,
      username: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
      tags?:  {
        __typename: "ModelImageTagConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetImageTagQueryVariables = {
  tag: string,
  image: string,
};

export type GetImageTagQuery = {
  getImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListImageTagsQueryVariables = {
  tag?: string | null,
  image?: ModelStringKeyConditionInput | null,
  filter?: ModelImageTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListImageTagsQuery = {
  listImageTags?:  {
    __typename: "ModelImageTagConnection",
    items?:  Array< {
      __typename: "ImageTag",
      image: string,
      tag: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type TagsByImageQueryVariables = {
  image?: string | null,
  tag?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelImageTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TagsByImageQuery = {
  tagsByImage?:  {
    __typename: "ModelImageTagConnection",
    items?:  Array< {
      __typename: "ImageTag",
      image: string,
      tag: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserImageTagQueryVariables = {
  tag: string,
  username: string,
  image: string,
};

export type GetUserImageTagQuery = {
  getUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUserImageTagsQueryVariables = {
  tag?: string | null,
  usernameImage?: ModelUserImageTagPrimaryCompositeKeyConditionInput | null,
  filter?: ModelUserImageTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUserImageTagsQuery = {
  listUserImageTags?:  {
    __typename: "ModelUserImageTagConnection",
    items?:  Array< {
      __typename: "UserImageTag",
      username: string,
      image: string,
      tag: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type TagsByUserImageQueryVariables = {
  username?: string | null,
  imageTag?: ModelUserImageTagTagsByUserImageCompositeKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserImageTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TagsByUserImageQuery = {
  tagsByUserImage?:  {
    __typename: "ModelUserImageTagConnection",
    items?:  Array< {
      __typename: "UserImageTag",
      username: string,
      image: string,
      tag: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
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

export type OnCreateIngestedImageSubscription = {
  onCreateIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateIngestedImageSubscription = {
  onUpdateIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteIngestedImageSubscription = {
  onDeleteIngestedImage?:  {
    __typename: "IngestedImage",
    image: string,
    username: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
    tags?:  {
      __typename: "ModelImageTagConnection",
      items?:  Array< {
        __typename: "ImageTag",
        image: string,
        tag: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateImageTagSubscription = {
  onCreateImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateImageTagSubscription = {
  onUpdateImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteImageTagSubscription = {
  onDeleteImageTag?:  {
    __typename: "ImageTag",
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserImageTagSubscription = {
  onCreateUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserImageTagSubscription = {
  onUpdateUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserImageTagSubscription = {
  onDeleteUserImageTag?:  {
    __typename: "UserImageTag",
    username: string,
    image: string,
    tag: string,
    createdAt: string,
    updatedAt: string,
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
