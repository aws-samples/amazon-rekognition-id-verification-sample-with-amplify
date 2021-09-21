import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify";
import { DashboardProps } from "../common/dashboard-props";
import Webcam from "react-webcam";
import { useRef } from "react";
import { useCallback, SetStateAction, useState, Dispatch } from "react";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { callGraphQL, callGraphQLWithSimpleInput, callGraphQLSimpleQuery } from "../common/common-types"
import { loginuser } from "../src/graphql/queries"
import { LoginuserQuery } from "../src/API"
import { HandThumbsUp } from 'react-bootstrap-icons';

interface LoginPageProps {
    CompanyId: string,
    Confidence: number,
    DOB: string,
    FaceId: string,
    FaceImage: string,
    FirstName: string,
    LastName: string,
    Message: string,
    RegistrationStatus: string,
    Success: boolean,
    Busy: boolean,
    UserId: string,
}

interface LoginSummaryRowData {
    header: string,
    value: string,
}

const initialProps = {
    CompanyId: '',
    Confidence: 0,
    DOB: '',
    FaceId: '',
    FaceImage: '',
    FirstName: '',
    LastName: '',
    Message: '',
    RegistrationStatus: '',
    Success: true,
    Busy: false,
    UserId: '',
}

const initialPropsBusy = {...JSON.parse(JSON.stringify(initialProps)), Busy: true};

const LoginSummaryRow = (props: LoginSummaryRowData) => {
    return (
        <tr>
            <td className="header-cell">{props.header}</td>
            <td className="value-cell">{props.value}</td>
        </tr>
    )
}

async function doLogin(imageBytesb64: string, setState: Dispatch<SetStateAction<LoginPageProps>>) {
    let input = {
        imageDataBase64: imageBytesb64
    };

    setState({...initialPropsBusy});

    // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
    const { data } = await callGraphQLWithSimpleInput<LoginuserQuery>(
        {
            query: loginuser,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: input
        }
    );

    setState({
        CompanyId: data?.loginuser?.CompanyId as string,
        Confidence: data?.loginuser?.Confidence as number,
        DOB: data?.loginuser?.DOB as string,
        FaceId: data?.loginuser?.FaceId as string,
        FaceImage: data?.loginuser?.FaceImage as string,
        FirstName: data?.loginuser?.FirstName as string,
        LastName: data?.loginuser?.LastName as string,
        Message: data?.loginuser?.Message as string,
        RegistrationStatus: data?.loginuser?.RegistrationStatus as string,
        Success: data?.loginuser?.Success as boolean,
        Busy: false,
        UserId: data?.loginuser?.UserId as string,
    });
}

export const LoginUser = (props: DashboardProps) => {
    const videoConstraints = {
        width: 300,
        height: 169,
        facingMode: "user"
    };

    const [state, setState] = useState(initialProps as LoginPageProps);

    const webcamRef = useRef(null) as any;

    const capture = useCallback(
        async () => {
            const base64header = 'data:image/jpeg;base64,';
            const imageSrc = webcamRef?.current?.getScreenshot();
            const imageBytesb64 = imageSrc.replace(base64header, '');

            await doLogin(imageBytesb64, setState);
        },
        [webcamRef]
    );

    return (
        <div>
            <div>
                <Webcam
                    audio={false}
                    height={videoConstraints.height}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={videoConstraints.width}
                    videoConstraints={videoConstraints}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                <button
                    className={`btn btn-primary ${state.Busy ? "disabled" : ""}`}
                    onClick={capture}>
                    {state.Busy ? 'Please wait...': 'Login'}
                </button>
            </div>
            <div className={`${state.Success ? "d-none" : "d-block"}`}>
                <h2 className="text-danger">Login failed</h2>
            </div>
            <div className={`${state.UserId ? "d-block" : "d-none"}`}>
                <hr />
                <div style={{ marginTop: 10 }}>
                    <div className="login-success">
                        Login successful
                        <HandThumbsUp style={{ marginBottom: 5, marginLeft: 3 }} />
                    </div>
                    <table className="table table-bordered" style={{marginTop: 10}}>
                        <tbody>
                            <LoginSummaryRow header="User Id" value={state.UserId}/>
                            <LoginSummaryRow header="First name" value={state.FirstName}/>
                            <LoginSummaryRow header="Last name" value={state.LastName}/>
                            <LoginSummaryRow header="DOB" value={state.DOB}/>
                            <LoginSummaryRow header="Registration status" value={state.RegistrationStatus}/>
                            <LoginSummaryRow header="Face Id" value={state.FaceId}/>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoginUser;