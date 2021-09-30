import useSWR from 'swr'
import { DashboardProps } from "../common/dashboard-props";
import React, { useState, SetStateAction, Dispatch } from "react";
import { useAsyncEffect } from "use-async-effect";
import { Auth, API, Storage } from "aws-amplify";
import { callGraphQLWithSimpleInput, callGraphQLSimpleQuery } from "../common/common-types";
import { userInfoByRegStatus } from "../src/graphql/queries";
import { deleteuser } from "../src/graphql/mutations";
import { DeleteuserMutation, UserInfo, UserInfoByRegStatusQuery } from "../src/API";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { ArrowLeft, ArrowRight, ArrowRightSquareFill, ArrowLeftSquareFill, Clipboard } from 'react-bootstrap-icons';
import Image from 'next/image';
import axios from 'axios';

interface BrowseUsersProps {
    selectedUser: UserInfo,
    userList: UserInfo[],
    fetchState: string,
    regStatusFilter: string,
}

interface BrowseUsersPropsWithStateInfo {
    props: BrowseUsersProps,
    setState: Dispatch<SetStateAction<BrowseUsersProps>>,
}

interface UserRowWithStateInfo {
    currentUser: UserInfo,
    props: BrowseUsersProps,
    setState: Dispatch<SetStateAction<BrowseUsersProps>>,
}

async function deleteUser(uInfo: UserInfo, state: BrowseUsersProps, setState: Dispatch<SetStateAction<BrowseUsersProps>>) {
    const variables = {userInfoAsJson: JSON.stringify(uInfo)};
    const deleteUserResponse = await callGraphQLSimpleQuery<DeleteuserMutation>(
        {
            query: deleteuser,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: variables,
        }
    );

    console.log(deleteUserResponse);

    setState({ userList: [] as UserInfo[], selectedUser: {} as UserInfo, fetchState: 'filterChanged', regStatusFilter: state.regStatusFilter })
}

async function fetchUsers(regStatusFilter: string = 'done'): Promise<UserInfo[]> {

    let input = {
        companyid: 'Amazon',
        registrationstatus: regStatusFilter == 'done' ? {eq: 'done'} : {beginsWith: 'error-'},
        limit: 12,
    };

    // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
    const { data } = await callGraphQLWithSimpleInput<UserInfoByRegStatusQuery>(
        {
            query: userInfoByRegStatus,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: input
        }
    );

    return data?.userInfoByRegStatus?.items as UserInfo[];
}

const UserDetail = (propsWithStateInfo: BrowseUsersPropsWithStateInfo) => {
    const uInfo = propsWithStateInfo.props.selectedUser;

    const [state, setState] = useState({imgLoaded: false, baseUrl: '', signedUrl: ''});

    // reset
    if(uInfo && uInfo.faceimage && state.imgLoaded && state.baseUrl != uInfo.faceimage) {
        setState({imgLoaded: false, baseUrl: '', signedUrl: ''});
    }

    useAsyncEffect(async isMounted => {
        if(uInfo && uInfo.faceimage && (!state.imgLoaded || state.baseUrl != uInfo.faceimage)) {
            const signedURL = await Storage.get(uInfo.faceimage.replace("public/", "")) as string;
            if (!isMounted()) return;

            setState({imgLoaded: true, signedUrl: signedURL, baseUrl: uInfo.faceimage});
        }
    });

    if (!uInfo || !uInfo.userid) {
        return (
            <div className="d-none">
            </div>
        );
    } else {
        return (
            <div style={{ marginLeft: 10, marginTop: 25, marginRight: 10 }}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#"
                                className="text-decoration-none"
                                onClick={() => propsWithStateInfo.setState({ userList: propsWithStateInfo.props.userList, selectedUser: {} as UserInfo, fetchState: propsWithStateInfo.props.fetchState, regStatusFilter: propsWithStateInfo.props.regStatusFilter })}>
                                Users
                            </a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{uInfo.firstname + ' ' + uInfo.lastname}</li>
                    </ol>
                </nav>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={state.signedUrl} className="img-fluid" />
                    <div className="card-body">
                        <h5 className="card-title">{'Id: ' + uInfo.userid}</h5>
                        <p className="card-text">{'Name: ' + uInfo.firstname + ' ' + uInfo.lastname}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{'Face id: ' + uInfo.faceid}</li>
                    </ul>
                    <div className="card-body d-flex justify-content-center">
                        <a
                            href="#"
                            onClick={() => deleteUser(uInfo, propsWithStateInfo.props, propsWithStateInfo.setState)}
                            className="btn btn-outline-danger text-decoration-none">
                            Delete
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const UserTypeTabs = (propsWithStateInfo: BrowseUsersPropsWithStateInfo) => {
    const props = propsWithStateInfo.props;
    const setState = propsWithStateInfo.setState;

    return (
        <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button className={`nav-link ${props.regStatusFilter == "done" ? "active" : ""}`}
                        onClick={() => setState({ userList: props.userList, selectedUser: {} as UserInfo, fetchState: 'filterChanged', regStatusFilter: "done" })}>
                        Registered
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${props.regStatusFilter == "done" ? "" : "active"}`}
                        onClick={() => setState({ userList: props.userList, selectedUser: {} as UserInfo, fetchState: 'filterChanged', regStatusFilter: "initial" })}>
                        Incomplete
                    </button>
                </li>
            </ul>
        </div>
    )
}

const UserEntry = (uRowWithStateInfo: UserRowWithStateInfo) => {
    const uInfo = uRowWithStateInfo.currentUser;

    const [state, setState] = useState({imgLoaded: false, signedUrl: ''});

    useAsyncEffect(async isMounted => {
        if(!state.imgLoaded && uInfo && uInfo.faceimage) {
            const signedURL = await Storage.get(uInfo.faceimage.replace("public/", "")) as string;
            if (!isMounted()) return;

            setState({imgLoaded: true, signedUrl: signedURL});
        }
    });

    return (
        <a href="#" 
        onClick={() => uRowWithStateInfo.setState({userList: uRowWithStateInfo.props.userList, selectedUser: uInfo, fetchState: uRowWithStateInfo.props.fetchState, regStatusFilter: uRowWithStateInfo.props.regStatusFilter})}
        className="list-group-item list-group-item-action" aria-current="true">
            <div className="d-flex w-100 justify-content-between">
                <div>
                    <h5 className="mb-1">{uInfo.firstname + ' ' + uInfo.lastname}</h5>
                    <div>{'User id: ' + uInfo.userid}</div>
                    <div>{'Face id: ' + uInfo.faceid}</div>
                </div>
                <div className={`image-parent float-right ${state.signedUrl ? "d-inline" : "d-none"}`}>
                    <img src={state.signedUrl} width="50" className="img-fluid" />
                </div>
            </div>
        </a>
    )
}

const UserList = (propsWithStateInfo: BrowseUsersPropsWithStateInfo) => {
    const props = propsWithStateInfo.props;

    return (
        <div
            className={`${props.selectedUser && (props.selectedUser as UserInfo).userid ? "d-none" : "d-block"}`}
            style={{ marginTop: 35, marginLeft: 10, marginRight: 10 }}>
            <div className="list-group">
                {props.userList.map((uInfo, index) => {
                    var userRowWithStateInfo = {
                        currentUser: uInfo,
                        props: props,
                        setState: propsWithStateInfo.setState,
                    };
                    return (
                        <UserEntry key={uInfo.userid} {...userRowWithStateInfo} />
                    );
                })}
            </div>
            <div className={`${props.userList.length <= 0 ? "d-block" : "d-none"} alert alert-info`}
                 style={{ marginLeft: 10, marginRight: 10 }}>
                { props.fetchState === 'postLoad' ? 'No users' : 'Please wait...' }
            </div>
        </div>
    )
}

export const BrowseUsers = (dashProps: DashboardProps) => {
    const [state, setState] = useState({userList: [] as UserInfo[], selectedUser: {} as UserInfo, fetchState: 'initial', regStatusFilter: 'done'} as BrowseUsersProps);

    useAsyncEffect(async isMounted => {
        if (state.fetchState == 'initial' ||
            state.fetchState == 'filterChanged') {
            const userList = await fetchUsers(state.regStatusFilter);
            if (!isMounted()) return;

            setState({ userList: userList, selectedUser: {} as UserInfo, fetchState: 'postLoad', regStatusFilter:  state.regStatusFilter});
        }
    });

    const propsWithStateInfo = {
        props: state,
        setState: setState
    };

    return (
        <div>
            <UserTypeTabs {...propsWithStateInfo} />
            <UserDetail {...propsWithStateInfo} />
            <UserList {...propsWithStateInfo}/>
        </div>
    );
}

export default BrowseUsers;