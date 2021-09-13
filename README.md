## Identity Verification with Amazon Rekognition

This sample, built using [AWS Amplify](https://aws.amazon.com/amplify/), is meant to showcase recommended flows when using [Amazon Rekognition](https://aws.amazon.com/rekognition/) for Identity Verification. There are two key components in this sample:

- Frontend: A React web application for exercising the key flows
- Backend: An GraphQL based backend built using AWS AppSync

## Flows

Users interested in implemented Identity Verification with Amazon Rekognition should consider the following flows.

### New user registration

1. Check face image quality via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
2. Use [SearchFacesByImage API](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html) against the collection(s) to check for any duplicate registration.
3. Index the face image using [IndexFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html) and use the ExternalImageID (Social Security number or a similar unique ID) parameter to associate the face embeddings with the ExternalImageID.
4. Store the face image in the S3 bucket along with the user metadata (face-id returned from the IndexFaces API, SSN and S3 URL) in DynamoDB. The SSN or a unique person identifier can be used as a key to lookup S3 URL and the face-id.

### Existing user login
1. Check face image quality via the [DetectFaces API](https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html).
2. Get the S3 URI from DynamoDB using Social Security number (or a similar unique ID) as a lookup key.
3. Search against the collection could be performed with [SearchFacesbyImage API](https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html). If there is a face match and person’s ID, and the ExternalImageID match a successful response can be returned.

## Deploying sample app

1. Initialize Amplify

```
amplify init
```

2. Deploy the backend

```
amplify push
```

Please see the [Amplify Getting Started](https://docs.amplify.aws/start/q/integration/js/) instructions for details on deploying the Amplify application.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

