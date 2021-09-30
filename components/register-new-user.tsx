import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify";
import { DashboardProps } from "../common/dashboard-props";
import Webcam from "react-webcam";
import { useReducer, useRef } from "react";
import { useCallback, SetStateAction, useState, Dispatch, ReducerAction } from "react";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { callGraphQL, callGraphQLSimpleQuery } from "../common/common-types"
import { createUserInfo, deleteuser, registernewuser } from "../src/graphql/mutations"
import { CreateUserInfoMutation, DeleteuserMutation, RegisternewuserMutation } from "../src/API"
import Alert from '../components/alert';
import Link from "next/link";

interface RegNewUserProps {
    screenshot: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    busy: boolean,
    status: string,
    alertMessage: string,
}

interface SubmissionSummaryProps {
    userProps: RegNewUserProps,
    resetFunc: () => void
}

interface SummaryRowData {
    header: string,
    value: string,
}

interface StoragePutResponse {
    key: string
}

interface RegUserAction {
    type: string,
    payload: string,
}

interface RegFieldsProps {
    innerProps: RegNewUserProps,
    dispatch: Dispatch<RegUserAction>
}

const initialProps = { screenshot: '', userid: '', firstname: '', lastname: '', dob: '1999-01-01', busy: false, status: 'initial', alertMessage: ''  };

function reducer(state: RegNewUserProps, action: RegUserAction) {
    switch(action.type) {
        case 'userid':
            return {
                ...state,
                userid: action.payload,
            };
        case 'firstname':
            return {
                ...state,
                firstname: action.payload,
            };
        case 'lastname':
            return {
                ...state,
                lastname: action.payload,
            };
        case 'dob':
            return {
                ...state,
                dob: action.payload,
            };
        case 'screenshot':
            return {
                ...state,
                screenshot: action.payload,
            };
        case 'busy':
            return {
                ...state,
                busy: (action.payload == "true"),
            };
        case 'alertMessage':
            return {
                ...state,
                alertMessage: action.payload,
            };
        case 'reset':
            return initialProps;
        case 'success':
            return {
                ...state,
                status: 'success',
            };
        default:
            return state;
    }
}

function validateFields(props: RegNewUserProps) {
    if (!props.firstname ||
        !props.lastname ||
        !props.dob ||
        !props.screenshot ||
        !props.userid) {
        return false;
    }

    return true;
}

async function submitUser(props: RegNewUserProps, dispatch: Dispatch<RegUserAction>) {

    try {
        if (!validateFields(props)) {
            dispatch({ type: 'alertMessage', payload: 'Please fill in all fields; *and* please ensure that you\'ve supplied a selfie image.' });
            return;
        }

        dispatch({ type: 'alertMessage', payload: '' });
        dispatch({type: 'busy', payload: 'true'});

        // create ddb entry first
        var filename = "regimages/" + props.userid + ".jpg";
        var userInfo = {
            companyid: 'Amazon',
            userid: props.userid,
            firstname: props.firstname,
            lastname: props.lastname,
            dob: props.dob,
            registrationstatus: 'error-initialentry',
            faceimage: filename,
        }

        const createUserResponse = await callGraphQL<CreateUserInfoMutation>(
            {
                query: createUserInfo,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: {
                    input: userInfo
                }
            }
        );

        // then store image in s3 bucket
        let imageData = await fetch(props.screenshot);
        let blob = await imageData.blob();
        const storageResponse = await Storage.put(filename,
            blob, {
            contentType: 'image/jpeg',
            progressCallback(progress: any) {
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            }
        }) as StoragePutResponse;

        if (storageResponse && storageResponse.key) {

            // call api to run through idv new user registration flow.
            // see lambda function idvworkflowfn for more details
            const variables = {userInfoAsJson: JSON.stringify(userInfo)};
            const registerUserResponse = await callGraphQLSimpleQuery<RegisternewuserMutation>(
                {
                    query: registernewuser,
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                    variables: variables,
                }
            );

            console.log(registerUserResponse);

            if (!registerUserResponse.data?.registernewuser?.Success) {
                // cleanup
                console.log("Cleaning up incomplete user registration...")
                const variables = {userInfoAsJson: JSON.stringify(userInfo)};
                const deleteUserResponse = await callGraphQLSimpleQuery<DeleteuserMutation>(
                    {
                        query: deleteuser,
                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                        variables: variables,
                    }
                );
                console.log("Done cleaning up incomplete user registration...")

                dispatch({ type: 'alertMessage', payload: registerUserResponse.data?.registernewuser?.Message as string });
                dispatch({ type: 'busy', payload: 'false' });
            } else {
                dispatch({ type: 'success', payload: '' });
            }
        }
    } catch (errors) {
        dispatch({ type: 'alertMessage', payload: 'Possible duplicate key. ' + JSON.stringify(errors) });
        dispatch({type: 'busy', payload: 'false'});
        console.log(errors);
    }
}

const SummaryRow = (props: SummaryRowData) => {
    return (
        <tr>
            <td className="header-cell">{props.header}</td>
            <td className="value-cell">{props.value}</td>
        </tr>
    )
}

const SubmissionSummary = (props: SubmissionSummaryProps) => {
    const userProps = props.userProps;
    const reset = props.resetFunc;

    return (
        <div className={`${userProps.status == 'success' ? 'd-block' : 'd-none'}`}>
            <h2 className="text-success">
                Successfully registered user
            </h2>
            <table className="table table-bordered" style={{ marginTop: 10 }}>
                <tbody>
                    <SummaryRow header="User Id" value={userProps.userid} />
                    <SummaryRow header="First name" value={userProps.firstname} />
                    <SummaryRow header="Last name" value={userProps.lastname} />
                    <SummaryRow header="DOB" value={userProps.dob} />
                </tbody>
            </table>
            <div>
                <Link href="/login-user">
                    <a className="btn btn-info">
                        Try logging in
                    </a>
                </Link>
                <button
                    className="btn btn-outline-secondary"
                    onClick={reset}
                    style={{ marginLeft: 5 }}>
                    Register another user
                </button>
            </div>
        </div>
    );
}

const RegistrationFields = (iProps: RegFieldsProps) => {
    const props = iProps.innerProps;
    const dispatch = iProps.dispatch;
    return (
        <div>
            <div className="mb-3">
                <label className="form-label">User Id</label>
                <input type="text" className="form-control" id="userid" value={props.userid} onChange={(e) => dispatch({type: 'userid', payload: e.target.value})} />
                <label className="form-label">First name</label>
                <input type="text" className="form-control" id="firstname" value={props.firstname} onChange={(e) => dispatch({type: 'firstname', payload: e.target.value})} />
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" id="lastname" value={props.lastname} onChange={(e) => dispatch({type: 'lastname', payload: e.target.value})} />
                <label className="form-label">Date of birth</label>
                <input type="text" className="form-control" id="dob" value={props.dob} onChange={(e) => dispatch({type: 'dob', payload: e.target.value})} />
            </div>
        </div>
    )
}

export const RegisterNewUser = (props: DashboardProps) => {
    const videoConstraints = {
        width: 300,
        height: 169,
        facingMode: "user"
    };

    const [state, dispatch] = useReducer(reducer, initialProps);

    const webcamRef = useRef(null) as any;

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef?.current?.getScreenshot();
            dispatch({type: 'screenshot', payload: imageSrc});
        },
        [webcamRef]
    );

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        dispatch({ type: 'screenshot', payload: imageList });
    }

    const uploadImg = useCallback(
        async() => {
            const copiedText = await navigator.clipboard.readText();
            const headerToReplace = 'data:binary/octet-stream;base64,';
            const base64header = 'data:image/jpeg;base64,';
            const imageSrc = copiedText.replace(headerToReplace, base64header);
            dispatch({type: 'screenshot', payload: imageSrc});
        },
        []
    );

    const regFieldsArg = {
        innerProps: state as RegNewUserProps,
        dispatch: dispatch as Dispatch<RegUserAction>
    };

    const submissionSummaryProps = {
        userProps: state,
        resetFunc: () => dispatch({ type: 'reset', payload: '' })
    }

    return (
        <div>
            {state.alertMessage && <Alert {...{ message: state.alertMessage }} />}
            <div className={`${state.status != 'success' ? 'd-block' : 'd-none'}`}>
                <Webcam
                    audio={false}
                    className={`${state.screenshot ? "d-none" : "d-block"}`}
                    height={videoConstraints.height}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={videoConstraints.width}
                    videoConstraints={videoConstraints}
                />
                <div
                    className={`${state.screenshot ? "d-block" : "d-none"}`}
                    style={{ marginTop: 10 }}>
                    <img src={state.screenshot} alt="face" height={videoConstraints.height} />
                </div>
            </div>
            <div className={`${state.status != 'success' ? 'd-block' : 'd-none'}`} style={{ marginTop: 10 }}>
                <button
                    className={`btn btn-outline-primary ${state.screenshot ? "d-none" : "d-inline"}`}
                    onClick={capture}>
                    Capture photo
                </button>
                <button
                    className={`btn btn-outline-primary ${state.screenshot ? "d-none" : "d-inline"}`}
                    style={{marginLeft: 10}}
                    onClick={uploadImg}>
                    Upload photo
                </button>
                <button
                    className={`btn btn-info ${state.screenshot ? "d-inline" : "d-none"}`}
                    onClick={() => dispatch({type: 'screenshot', payload: ''})}>
                    Retake pic
                </button>
            </div>
            <div className={`${state.status != 'success' ? 'd-block' : 'd-none'}`}>
                <hr/>
            </div>
            <div className={`${state.status != 'success' ? 'd-block' : 'd-none'}`} style={{ marginTop: 10 }}>
                <RegistrationFields {...regFieldsArg} />
                <button
                className={`btn btn-primary ${state.busy ? "disabled" : ""}`}
                onClick={() => submitUser(state, dispatch)}>
                {state.busy ? 'Please wait...': 'Register'}
            </button>
            </div>
            <SubmissionSummary {...submissionSummaryProps} />
        </div>
    );
};

export default RegisterNewUser;