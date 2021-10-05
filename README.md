## Identity Verification with Amazon Rekognition

This sample, built using [AWS Amplify](https://aws.amazon.com/amplify/), is meant to showcase recommended flows when using [Amazon Rekognition](https://aws.amazon.com/rekognition/) for Identity Verification. There are two key components in this sample:

- Frontend: A React/NextJS web application for exercising the key flows
- Backend: An GraphQL based backend built using AWS AppSync

## Flows

Users interested in implemented Identity Verification with Amazon Rekognition should consider the following flows.

### New user registration

1. Check face image quality via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
2. Use [SearchFacesByImage API](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html) against the collection(s) to check for any duplicate registration.
3. Index the face image using [IndexFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html) and use the ExternalImageID (Social Security number or a similar unique ID) parameter to associate the face embeddings with the ExternalImageID.
4. Store the face image in the S3 bucket along with the user metadata (face-id returned from the IndexFaces API, SSN and S3 URL) in DynamoDB. The SSN or a unique person identifier can be used as a key to lookup S3 URL and the face-id.

### New user registration w/ Id card

1. Check face image quality via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
2. Check face image quality of face on Id card via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
3. Use [CompareFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_CompareFaces.html) to ensure that the face on the supplied Id card and the face on the selfie match.
4. Use [SearchFacesByImage API](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html) against the collection(s) to check for any duplicate registration.
5. Index the face image using [IndexFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html) and use the ExternalImageID (Social Security number or a similar unique ID) parameter to associate the face embeddings with the ExternalImageID.
6. Store the face image in the S3 bucket along with the user metadata (face-id returned from the IndexFaces API, SSN and S3 URL) in DynamoDB. The SSN or a unique person identifier can be used as a key to lookup S3 URL and the face-id.

### Existing user login
1. Check face image quality via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
2. Search against the collection with [SearchFacesbyImage API](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html). If there is a face match, then return the use the faceId to return additional data about the user by cross-referencing against profile data in DynamoDB.

## Installing and configuring AWS Amplify

1. Install npm

First you'll need to install npm, if you don't already have it installed. Please see [npm docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for information on installing npm.

2. Install Amplify

Next, if you don't have the AWS Amplify CLI installed, please follow the instructions at [AWS Amplify - Installation](https://docs.amplify.aws/cli/start/install/).

## Deploying the sample app w/ one click deployment to the Amplify console

Simply click on the link below:

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/aws-samples/amazon-rekognition-id-verification-sample-with-amplify)


## Deploying sample app using the CLI

1. Clone the git repo on your local machine

```
git clone https://github.com/aws-samples/amazon-rekognition-id-verification-sample-with-amplify
```

2. Switch to the cloned directory and run `npm update`

```
cd amazon-rekognition-id-verification-sample-with-amplify
npm update --legacy-peer-deps
```

The `--legacy-peer-deps` flag is required by a package used in the sample.

3. Initialize Amplify

```
amplify init
```

4. Deploy the backend

```
amplify push
```

5. Deploy the frontend

```
amplify add hosting
amplify publish
```

For more details on hosting/publishing, please see [Add hosting to your app](https://docs.amplify.aws/start/getting-started/hosting/q/integration/js/#add-hosting-to-your-app). The [Amplify Getting Started](https://docs.amplify.aws/start/q/integration/js/) page has detailed instructions on working with Amplify.

## Getting started with the sample app

1. Create a user in the Cognito User Pool attached to the app.
2. Accessing the web endpoint.
Amplify allows you 

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

