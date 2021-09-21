import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify";
import { DashboardProps } from "../common/dashboard-props";
import Webcam from "react-webcam";
import { useReducer, useRef } from "react";
import { useCallback, SetStateAction, useState, Dispatch, ReducerAction } from "react";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { callGraphQL, callGraphQLSimpleQuery } from "../common/common-types"
import { createUserInfo, registernewuser } from "../src/graphql/mutations"
import { CreateUserInfoMutation, RegisternewuserMutation } from "../src/API"

interface RegNewUserProps {
    screenshot: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    busy: boolean,
    status: string,
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

const initialProps = { screenshot: '', userid: '', firstname: '', lastname: '', dob: '1999-01-01', busy: false, status: 'initial'  };

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

async function submitUser(props: RegNewUserProps, dispatch: Dispatch<RegUserAction>) {

    try {
        dispatch({type: 'busy', payload: 'true'});

        // first store image in s3 bucket
        var filename = "regimages/" + props.userid + ".jpg";
        let imageData = await fetch(props.screenshot);
        let blob = await imageData.blob();
        const storageResponse = await Storage.put(filename,
            blob, {
            contentType: 'image/jpeg',
            progressCallback(progress: any) {
                console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
            }
        }) as StoragePutResponse;

        // if successful, create ddb entry
        if (storageResponse && storageResponse.key) {
            var userInfo = {
                companyid: 'Amazon',
                userid: props.userid,
                firstname: props.firstname,
                lastname: props.lastname,
                dob: props.dob,
                registrationstatus: 'initialentry',
                faceimage: filename,
            }

            // create ddb entry and mark it as initial entry
            // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
            const createUserResponse = await callGraphQL<CreateUserInfoMutation>(
                {
                    query: createUserInfo,
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                    variables: {
                        input: userInfo
                    }
                }
            );

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

            // set state to success
            dispatch({type: 'success', payload: ''});
        }
    } catch (errors) {
        dispatch({type: 'busy', payload: 'false'});
        console.log(errors);
    }
}

const SubmissionSummary = (userProps: RegNewUserProps) => {
    return (
        <div className={`${userProps.status == 'success' ? 'd-block' : 'd-none'}`}>
            Blah
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

    const pasteImg = useCallback(
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

    return (
        <div>
            <div>
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
            <div style={{ marginTop: 10 }}>
                <button
                    className={`btn btn-outline-primary ${state.screenshot ? "d-none" : "d-inline"}`}
                    onClick={capture}>
                    Capture photo
                </button>
                <button
                    className={`btn btn-outline-primary ${state.screenshot ? "d-none" : "d-inline"}`}
                    style={{marginLeft: 10}}
                    onClick={pasteImg}>
                    Paste photo
                </button>
                <button
                    className={`btn btn-info ${state.screenshot ? "d-inline" : "d-none"}`}
                    onClick={() => dispatch({type: 'screenshot', payload: ''})}>
                    Retake pic
                </button>
            </div>
            <hr />
            <div style={{ marginTop: 10 }}>
                <RegistrationFields {...regFieldsArg} />
            </div>
            <button
                className={`btn btn-primary ${state.busy ? "disabled" : ""}`}
                onClick={() => submitUser(state, dispatch)}>
                {state.busy ? 'Please wait...': 'Register'}
            </button>
            <SubmissionSummary {...state}/>
        </div>
    );
};

export default RegisterNewUser;