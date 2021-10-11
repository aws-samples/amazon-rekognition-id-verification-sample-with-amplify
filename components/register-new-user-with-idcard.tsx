import { Amplify, API, Auth, withSSRContext, graphqlOperation, Storage } from "aws-amplify";
import { DashboardProps } from "../common/dashboard-props";
import Webcam from "react-webcam";
import ImageUploading from 'react-images-uploading'
import React, { useReducer, useRef } from "react";
import { useCallback, SetStateAction, useState, Dispatch, ReducerAction } from "react";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { callGraphQL, callGraphQLSimpleQuery, callGraphQLWithSimpleInput } from "../common/common-types"
import { createUserInfo, deleteuser, registernewuserwithidcard } from "../src/graphql/mutations"
import { detecttextinidcard } from "../src/graphql/queries"
import { CreateUserInfoMutation, DeleteuserMutation, RegisternewuserwithidcardMutation, DetecttextinidcardQuery } from "../src/API"
import Image from "next/image"
import { getImageFromUploadComponent } from "../common/image-capture-helpers";
import { Button, Modal } from "react-bootstrap";
import Alert from '../components/alert';
import Link from "next/link";
import { CardText } from 'react-bootstrap-icons';

interface RegNewUserWithIdCardProps {
    screenshot: string,
    userid: string,
    firstname: string,
    lastname: string,
    dob: string,
    busy: boolean,
    status: string,
    idCard: any,
    showTextCopyModal: boolean,
    alertMessage: string,
    affectedField: string,
    showCardTextButton: boolean,
    pastableText: string[],
}

interface SubmissionSummaryProps {
    userProps: RegNewUserWithIdCardProps,
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
    innerProps: RegNewUserWithIdCardProps,
    dispatch: Dispatch<RegUserAction>
}

const initialProps = { screenshot: '', 
                       userid: '',
                       firstname: '',
                       lastname: '',
                       dob: '',
                       busy: false,
                       status: 'initial',
                       idCard: null,
                       showTextCopyModal: false,
                       alertMessage: '',
                       pastableText: [],
                       affectedField: '',
                       showCardTextButton: false
                    };

function reducer(state: RegNewUserWithIdCardProps, action: RegUserAction) {
    switch (action.type) {
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
                busy: false,
            };
        case 'idCard':
            return {
                ...state,
                idCard: action.payload,
            };
        case 'showTextCopyModal':
            return {
                ...state,
                showTextCopyModal: (action.payload == "true"),
            };
        case 'showCardTextButton':
            return {
                ...state,
                showCardTextButton: (action.payload == "true"),
            };
        case 'affectedField':
            return {
                ...state,
                affectedField: action.payload,
            };
        case 'pastableText':
            return {
                ...state,
                pastableText: action.payload.split("|"),
            };
        default:
            return state;
    }
}

function validateFields(props: RegNewUserWithIdCardProps) {
    if (!props.firstname ||
        !props.lastname ||
        !props.dob ||
        !props.screenshot ||
        !props.idCard ||
        !props.userid) {
        return false;
    }

    return true;
}

async function fetchTextInCard(imageBytesb64: string, props: RegNewUserWithIdCardProps, dispatch: Dispatch<RegUserAction>) {
    let input = {
        imageDataBase64: imageBytesb64
    };

    dispatch({ type: 'pastableText', payload: '' });
    dispatch({ type: 'showCardTextButton', payload: 'false' });

    try {
        // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
        const { data } = await callGraphQLWithSimpleInput<DetecttextinidcardQuery>(
            {
                query: detecttextinidcard,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: input
            }
        );

        if (data?.detecttextinidcard?.DetectedText &&
            data.detecttextinidcard.DetectedText.length > 0) {
            var pastableText = '';
            for (var i = 0; i < data.detecttextinidcard.DetectedText.length; i++) {
                pastableText = pastableText + data.detecttextinidcard.DetectedText[i] + "|";
            }

            dispatch({ type: 'pastableText', payload: pastableText });
            dispatch({ type: 'showCardTextButton', payload: 'true' });
        }
    }
    catch (errors) {
    }
}

async function submitUser(props: RegNewUserWithIdCardProps, dispatch: Dispatch<RegUserAction>) {

    try {
        if (!validateFields(props)) {
            dispatch({ type: 'alertMessage', payload: 'Please fill in all fields; *and* please ensure that you\'ve supplied both a selfie image and uploaded an id card.' });
            return;
        }

        dispatch({ type: 'alertMessage', payload: '' });
        dispatch({ type: 'busy', payload: 'true' });

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

        if (!storageResponse || !storageResponse.key) {
            console.log("Unable to upload image");
            dispatch({ type: 'busy', payload: 'false' });
            return;
        }

        // call api to run through idv new user registration flow
        // see lambda function idvworkflowfn for more details
        const variables = {
            userInfoAsJson: JSON.stringify(userInfo),
            faceImageDataBase64: getImageFromUploadComponent(props.screenshot),
            idImageDataBase64: getImageFromUploadComponent(props.idCard[0]["data_url"])
        };

        const registerUserResponse = await callGraphQLSimpleQuery<RegisternewuserwithidcardMutation>(
            {
                query: registernewuserwithidcard,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: variables,
            }
        );

        if (!registerUserResponse.data?.registernewuserwithidcard?.Success) {
            // cleanup
            console.log("Cleaning up incomplete user registration...")
            const variables = { userInfoAsJson: JSON.stringify(userInfo) };
            const deleteUserResponse = await callGraphQLSimpleQuery<DeleteuserMutation>(
                {
                    query: deleteuser,
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                    variables: variables,
                }
            );
            console.log("Done cleaning up incomplete user registration...")

            dispatch({ type: 'alertMessage', payload: registerUserResponse.data?.registernewuserwithidcard?.Message as string });
            dispatch({ type: 'busy', payload: 'false' });
        } else {
            dispatch({ type: 'success', payload: '' });
        }
    } catch (errors) {
        dispatch({ type: 'alertMessage', payload: 'Possible duplicate key. ' + JSON.stringify(errors) });
        dispatch({ type: 'busy', payload: 'false' });
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
    const onCardTextClick = (affectedField: string) => {
        dispatch({ type: 'affectedField', payload: affectedField });
        dispatch({ type: 'showTextCopyModal', payload: "true" });
    };
    return (
        <div>
            <div className="mb-3">
                <label className="form-label">User Id</label>
                <button className={`btn btn-link text-decoration-none ${props.showCardTextButton ? "d-inline" : "d-none"}`}
                    style={{ marginBottom: 6, marginLeft: 4, padding: 0 }}
                    onClick={() => onCardTextClick('userid')}>
                    <CardText />
                </button>
                <input type="text" className="form-control" id="userid" value={props.userid} onChange={(e) => dispatch({ type: 'userid', payload: e.target.value })} />
                <label className="form-label">First name</label>
                <button className={`btn btn-link text-decoration-none ${props.showCardTextButton ? "d-inline" : "d-none"}`}
                    style={{ marginBottom: 6, marginLeft: 4, padding: 0 }}
                    onClick={() => onCardTextClick('firstname')}>
                    <CardText />
                </button>
                <input type="text" className="form-control" id="firstname" value={props.firstname} onChange={(e) => dispatch({ type: 'firstname', payload: e.target.value })} />
                <label className="form-label">Last name</label>
                <button className={`btn btn-link text-decoration-none ${props.showCardTextButton ? "d-inline" : "d-none"}`}
                    style={{ marginBottom: 6, marginLeft: 4, padding: 0 }}
                    onClick={() => onCardTextClick('lastname')}>
                    <CardText />
                </button>
                <input type="text" className="form-control" id="lastname" value={props.lastname} onChange={(e) => dispatch({ type: 'lastname', payload: e.target.value })} />
                <label className="form-label">Date of birth</label>
                <button className={`btn btn-link text-decoration-none ${props.showCardTextButton ? "d-inline" : "d-none"}`}
                    style={{ marginBottom: 6, marginLeft: 4, padding: 0 }}
                    onClick={() => onCardTextClick('dob')}>
                    <CardText />
                </button>
                <input type="text" className="form-control" id="dob" value={props.dob} onChange={(e) => dispatch({ type: 'dob', payload: e.target.value })} />
            </div>
        </div>
    )
}

export const RegisterNewUserWithIdCard = (props: DashboardProps) => {
    const videoConstraints = {
        width: 300,
        height: 169,
        facingMode: "user"
    };

    const maxNumber = 70;

    const [state, dispatch] = useReducer(reducer, initialProps);

    const webcamRef = useRef(null) as any;

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef?.current?.getScreenshot();
            dispatch({ type: 'screenshot', payload: imageSrc });
        },
        [webcamRef]
    );

    const regFieldsArg = {
        innerProps: state as RegNewUserWithIdCardProps,
        dispatch: dispatch as Dispatch<RegUserAction>
    };

    const onChange = async (imageList: any, addUpdateIndex: any) => {
        dispatch({ type: 'idCard', payload: imageList });

        const idImageDataBase64 = getImageFromUploadComponent(imageList[0]["data_url"]);
        await fetchTextInCard(idImageDataBase64, state, dispatch);
    }

    const submissionSummaryProps = {
        userProps: state,
        resetFunc: () => dispatch({ type: 'reset', payload: '' })
    }

    const handleClose = () => dispatch({ type: 'showTextCopyModal', payload: "false" });
    const textSelected = (e: any, selectedText: string) => {
        e.preventDefault();
        dispatch({type: state.affectedField, payload: selectedText});
        dispatch({ type: 'showTextCopyModal', payload: "false" })
    };

    return (
        <div>
            <div className={`container ${state.status != 'success' ? 'd-block' : 'd-none'}`}>
                {state.alertMessage && <Alert {...{ message: state.alertMessage }} />}
                <div className="row">
                    <div className="col-md-6" style={{ border: "1px solid #eeeeee", padding: 5 }}>
                        <h3>Selfie</h3>
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
                    <div className="col-md-6" style={{ border: "1px solid #eeeeee" }}>
                        <ImageUploading
                            multiple={false}
                            value={state.idCard}
                            onChange={onChange}
                            maxNumber={maxNumber}
                            dataURLKey="data_url"
                        >
                            {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                <div className="upload__image-wrapper">
                                    <h3>Id card</h3>
                                    {!imageList || imageList.length <= 0 && <button
                                        style={isDragging ? { color: 'red' } : undefined}
                                        onClick={onImageUpload}
                                        className="btn btn-primary"
                                        {...dragProps}
                                    >
                                        Click or Drop here
                                    </button>}
                                    {imageList.map((image, index) => (
                                        <div key={index} className="image-item border border-info m-2 p-2">
                                            <Image src={image['data_url']} alt="" width="300" height="200" />
                                            <div className="image-item__btn-wrapper">
                                                <button className="btn btn-primary" style={{ marginRight: "5px" }} onClick={() => onImageUpdate(index)}>Update</button>
                                                <button className="btn btn-danger" style={{ marginRight: "5px" }} onClick={() => onImageRemove(index)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </ImageUploading>
                    </div>
                </div>
            </div>
            <div className={`container ${state.status != 'success' ? 'd-block' : 'd-none'}`} style={{ marginTop: 10 }}>
                <button
                    className={`btn btn-outline-primary ${state.screenshot ? "d-none" : "d-inline"}`}
                    onClick={capture}>
                    Capture photo
                </button>
                <button
                    className={`btn btn-info ${state.screenshot ? "d-inline" : "d-none"}`}
                    onClick={() => dispatch({ type: 'screenshot', payload: '' })}>
                    Retake pic
                </button>
            </div>
            <div className={`container ${state.status != 'success' ? 'd-block' : 'd-none'}`}>
                <hr />
            </div>
            <div className={`container ${state.status != 'success' ? 'd-block' : 'd-none'}`} style={{ marginTop: 10 }}>
                <RegistrationFields {...regFieldsArg} />
                <button
                    className={`btn btn-primary ${state.busy ? "disabled" : ""}`}
                    onClick={() => submitUser(state, dispatch)}>
                    {state.busy ? 'Registering' : 'Register'}
                </button>
            </div>
            <SubmissionSummary {...submissionSummaryProps} />
            <Modal show={state.showTextCopyModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select text</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="list-group">
                        {state.pastableText.map((item, index) => {
                            return (
                                <a href="{void(0)}" className="text-decoration-none" onClick={(e) => textSelected(e, item)} key={index}>
                                    <li className="list-group-item">
                                        {item}
                                    </li>
                                </a>
                            );
                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default RegisterNewUserWithIdCard;