import { PageProps } from "../common/common-types"
import Link from "next/link";

export const Dashboard = (props: PageProps) => {
    return (
        <div>
            <div>
                <p>
                    This demo application showcases 4 key suggested flows for Id Verification applications built using Amazon Recognition.
                </p>
                <h2>Register new user flow</h2>
                <ol>
                    <li>Check face image quality via the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">DetectFaces API</a></Link>.</li>
                    <li>Use the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">SearchFacesByImage API</a></Link> against the collection(s) to check for any duplicate registration.</li>
                    <li>Index the face image using <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html"><a target="_blank">IndexFaces API</a></Link> and use the ExternalImageID (Social Security number or a similar unique ID) parameter to associate the face embeddings with the ExternalImageID.</li>
                    <li>Store the face image in the S3 bucket along with the user metadata (face-id returned from the IndexFaces API, SSN and S3 URL) in DynamoDB. The SSN or a unique person identifier can be used as a key to lookup S3 URL and the face-id.</li>
                </ol>
                <Link href="/register-new-user">
                    <a className="btn btn-info">
                        Try out
                    </a>
                </Link>
                <strong className="text-secondary" style={{ marginLeft: 10, marginTop: 10 }}>Register new user flow</strong>
            </div>
            <hr />
            <div>
                <h2>Register new user with ID card flow</h2>
                <div className="alert alert-info">
                    {"What's"} different about this flow from the one above is that it requires the user to provide an Id card during the registration process. 
                    The faces on the Id card and the selfie are compared against each other to ensure that they match. 
                    The rest of the steps in the flow are identical to the above flow.
                </div>
                <ol>
                    <li>Check face image quality via the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">DetectFaces API</a></Link>.</li>
                    <li>Check face image quality of face on Id card via the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">DetectFaces API</a></Link>.</li>
                    <li>Use <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_CompareFaces.html"><a target="_blank">CompareFaces API</a></Link> to ensure that the face on the supplied Id card and the face on the selfie match.</li>
                    <li>Use the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">SearchFacesByImage API</a></Link> against the collection(s) to check for any duplicate registration.</li>
                    <li>Index the face image using <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_IndexFaces.html"><a target="_blank">IndexFaces API</a></Link> and use the ExternalImageID (Social Security number or a similar unique ID) parameter to associate the face embeddings with the ExternalImageID.</li>
                    <li>Store the face image in the S3 bucket along with the user metadata (face-id returned from the IndexFaces API, SSN and S3 URL) in DynamoDB. The SSN or a unique person identifier can be used as a key to lookup S3 URL and the face-id.</li>
                </ol>
                <Link href="/register-new-user-with-idcard">
                    <a className="btn btn-info">
                        Try out
                    </a>
                </Link>
                <strong style={{ marginLeft: 10 }} className="text-secondary">Register new user with id card flow</strong>
            </div>
            <hr />
            <div>
                <h2>Existing user login flow</h2>
                <ol>
                    <li>Check face image quality via the <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_DetectFaces.html"><a target="_blank">DetectFaces API</a></Link>.</li>
                    <li>Search against the collection with <Link href="https://docs.aws.amazon.com/rekognition/latest/dg/API_SearchFacesByImage.html"><a target="_blank">SearchFacesbyImage API</a></Link>. If there is a face match, then return the use the faceId to return additional data about the user by cross-referencing against profile data in DynamoDB</li>
                </ol>
                <Link href="/login-user">
                    <a className="btn btn-info">
                        Try out
                    </a>
                </Link>
                <strong style={{ marginLeft: 10 }} className="text-secondary">Existing user login flow</strong>
            </div>
            <hr />
            <div>
                <h2>Update existing user photo flow</h2>
                <p>Coming soon...</p>
            </div>
        </div>
    );
};

export default Dashboard;