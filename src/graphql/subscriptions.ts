/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIngestedImage = /* GraphQL */ `
  subscription OnCreateIngestedImage {
    onCreateIngestedImage {
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
export const onUpdateIngestedImage = /* GraphQL */ `
  subscription OnUpdateIngestedImage {
    onUpdateIngestedImage {
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
export const onDeleteIngestedImage = /* GraphQL */ `
  subscription OnDeleteIngestedImage {
    onDeleteIngestedImage {
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
export const onCreateImageTag = /* GraphQL */ `
  subscription OnCreateImageTag {
    onCreateImageTag {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateImageTag = /* GraphQL */ `
  subscription OnUpdateImageTag {
    onUpdateImageTag {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteImageTag = /* GraphQL */ `
  subscription OnDeleteImageTag {
    onDeleteImageTag {
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserImageTag = /* GraphQL */ `
  subscription OnCreateUserImageTag {
    onCreateUserImageTag {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserImageTag = /* GraphQL */ `
  subscription OnUpdateUserImageTag {
    onUpdateUserImageTag {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserImageTag = /* GraphQL */ `
  subscription OnDeleteUserImageTag {
    onDeleteUserImageTag {
      username
      image
      tag
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUserInfo = /* GraphQL */ `
  subscription OnCreateUserInfo {
    onCreateUserInfo {
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
export const onUpdateUserInfo = /* GraphQL */ `
  subscription OnUpdateUserInfo {
    onUpdateUserInfo {
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
export const onDeleteUserInfo = /* GraphQL */ `
  subscription OnDeleteUserInfo {
    onDeleteUserInfo {
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
