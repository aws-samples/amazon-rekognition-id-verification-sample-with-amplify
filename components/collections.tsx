import { callGraphQLSimpleQuery, callGraphQLWithSimpleInput, deletecollectionFunc, getDefaultCollection, setDefaultCollection } from "../common/common-types"
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useAsyncEffect } from "use-async-effect";
import { DashboardProps } from "../common/dashboard-props";
import { CreatecollectionMutation, ListcollectionsQuery, CollectionResponse, DescribecollectionQuery, DescribeCollectionResponse } from "../src/API";
import { listcollections, describecollection } from "../src/graphql/queries";
import { createcollection } from "../src/graphql/mutations";
import Alert from '../components/alert';
import React, { useState, SetStateAction, Dispatch } from "react";
import { Button, Modal } from "react-bootstrap";
import { CheckCircleFill } from 'react-bootstrap-icons';

interface CollectionPageProps {
    collectionId: string,
    collections: DescribeCollectionResponse[],
    fetchState: string,
    isFetching: boolean,
    alertMessage: string,
    showModal: boolean,
    defaultCollection: string,
}

function handleCollectionIdChange(event: any, state: CollectionPageProps, setState: Dispatch<SetStateAction<CollectionPageProps>>) {
    setState({ collectionId: event.target.value,
        collections: state.collections,
        fetchState: 'handleCollectionIdChange',
        isFetching: state.isFetching,
        alertMessage: '',
        showModal: false,
        defaultCollection: state.defaultCollection });
}

async function fetchCollections(): Promise<DescribeCollectionResponse[]> {
    const variables = { msg: '' };
    const { data } = await callGraphQLSimpleQuery<ListcollectionsQuery>(
        {
            query: listcollections,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: variables,
        }
    );

    if (data && data.listcollections) {
        const listcollections = data.listcollections;
        var retVal = [] as DescribeCollectionResponse[];
        for (var i = 0; i < listcollections.length; i++) {
            const dvars = { collectionId: listcollections[i]?.CollectionId };
            const { data } = await callGraphQLSimpleQuery<DescribecollectionQuery>(
                {
                    query: describecollection,
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                    variables: dvars,
                }
            );

            retVal.push(data?.describecollection as DescribeCollectionResponse);
        }

        return retVal;
    } else {
        return [] as DescribeCollectionResponse[];
    }
}

const onAddCollection = async (pageProps: CollectionPageProps,
    setState: Dispatch<SetStateAction<CollectionPageProps>>,
    showModal: () => void,
    closeModal: () => void) => {

    const variables = { collectionId: pageProps.collectionId };

    showModal();

    try {
        const { data } = await callGraphQLSimpleQuery<CreatecollectionMutation>(
            {
                query: createcollection,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: variables,
            }
        );

        if(!data?.createcollection?.Success) {
            closeModal();
            setState({ collectionId: pageProps.collectionId, 
                collections: pageProps.collections, 
                fetchState: pageProps.fetchState, 
                isFetching: pageProps.isFetching, 
                alertMessage: data?.createcollection?.Message as string,
                showModal: pageProps.showModal,
                defaultCollection: pageProps.defaultCollection });
        } else {
            const fetchedCollectionList = await fetchCollections();
            closeModal();
            setState({ collectionId: '', 
                collections: fetchedCollectionList, 
                fetchState: pageProps.fetchState, 
                isFetching: pageProps.isFetching, 
                alertMessage: pageProps.alertMessage,
                showModal: pageProps.showModal,
                defaultCollection: pageProps.defaultCollection });
        }
    } catch (errors) {
        closeModal();

        setState({ collectionId: pageProps.collectionId, 
            collections: pageProps.collections, 
            fetchState: pageProps.fetchState, 
            isFetching: pageProps.isFetching, 
            alertMessage: JSON.stringify(errors),
            showModal: pageProps.showModal,
            defaultCollection: pageProps.defaultCollection });
    }
}

export const Collections = (props: DashboardProps) => {
    const [pageProps, setState] = useState({
        collectionId: '',
        collections: [] as DescribeCollectionResponse[],
        fetchState: 'initial',
        isFetching: true,
        alertMessage: '',
        showModal: false,
        defaultCollection: '',
    });

    useAsyncEffect(async isMounted => {
        if (pageProps.fetchState == 'initial') {

            const defaultColl = await getDefaultCollection();

            const fetchedCollectionList = await fetchCollections();
            if (!isMounted()) return;

            var configEntryAlertMsg = '';
            var defaultCollVal = '';
            if(!defaultColl?.getConfigEntry) {
                configEntryAlertMsg = 'No active collection configured. Please configure an active collection.'
            } else {
                defaultCollVal = defaultColl.getConfigEntry.value;
            }

            setState({
                collectionId: pageProps.collectionId,
                collections: fetchedCollectionList,
                fetchState: 'postLoad',
                isFetching: false,
                alertMessage: configEntryAlertMsg ? configEntryAlertMsg : pageProps.alertMessage,
                showModal: pageProps.showModal,
                defaultCollection: defaultCollVal,
            });
        }
    });

    const handleClose = () => setState({
        collectionId: pageProps.collectionId,
        collections: pageProps.collections,
        fetchState: pageProps.fetchState,
        isFetching: pageProps.isFetching,
        alertMessage: pageProps.alertMessage,
        showModal: false,
        defaultCollection: pageProps.defaultCollection,
    });
    const handleShow = () => setState({
        collectionId: pageProps.collectionId,
        collections: pageProps.collections,
        fetchState: pageProps.fetchState,
        isFetching: pageProps.isFetching,
        alertMessage: pageProps.alertMessage,
        showModal: true,
        defaultCollection: pageProps.defaultCollection,
    });
    const handleMakeActiveColl = async (activeColl: string) => {
        const response = await setDefaultCollection(activeColl);
        if (response.Success) {
            setState({
                collectionId: pageProps.collectionId,
                collections: pageProps.collections,
                fetchState: pageProps.fetchState,
                isFetching: pageProps.isFetching,
                alertMessage: pageProps.alertMessage,
                showModal: pageProps.showModal,
                defaultCollection: activeColl,
            });
        } else {
            setState({
                collectionId: pageProps.collectionId,
                collections: pageProps.collections,
                fetchState: pageProps.fetchState,
                isFetching: pageProps.isFetching,
                alertMessage: response.Message,
                showModal: pageProps.showModal,
                defaultCollection: pageProps.defaultCollection,
            });
        }
    };
    const handleDeleteColl = async (collectionId: string) => {
        handleShow();
        const response = await deletecollectionFunc(collectionId);
        try {
            if (response.Success) {
                const fetchedCollectionList = await fetchCollections();
                setState({
                    collectionId: pageProps.collectionId,
                    collections: fetchedCollectionList,
                    fetchState: pageProps.fetchState,
                    isFetching: pageProps.isFetching,
                    alertMessage: pageProps.alertMessage,
                    showModal: false,
                    defaultCollection: pageProps.defaultCollection,
                });
            } else {
                setState({
                    collectionId: pageProps.collectionId,
                    collections: pageProps.collections,
                    fetchState: pageProps.fetchState,
                    isFetching: pageProps.isFetching,
                    alertMessage: response.Message,
                    showModal: false,
                    defaultCollection: pageProps.defaultCollection,
                });
            }
        } catch (errors) {
            handleClose();
            console.log(errors);
        }
    };

    return (
        <div>
            {pageProps.alertMessage && <Alert {...{ message: pageProps.alertMessage }} />}
            <div className={`${pageProps.isFetching ? "d-none" : "d-block"}`}>
                <input type="text" value={pageProps.collectionId} onChange={(e) => handleCollectionIdChange(e, pageProps, setState)} placeholder="New collection" autoFocus />
                <button
                    className="btn btn-primary btn-sm"
                    style={{ marginRight: 3, marginLeft: 15, marginBottom: 3 }}
                    onClick={() => onAddCollection(pageProps, setState, handleShow, handleClose)}>
                    Add
                </button>
            </div>
            <div className={`${pageProps.isFetching ? "d-block" : "d-none"}`}>
                Fetching. Please wait...
            </div>
            <div className={`${pageProps.isFetching ? "d-none" : "d-block"}`}>
                <div style={{marginTop: 10}}>
                    <div className="list-group">
                        {pageProps.collections.map((item, index) => {
                            var isActive = item.CollectionId === pageProps.defaultCollection;
                            return (
                                <div key={item.CollectionId} className="list-group-item list-group-item-action" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className={`mb-1 ${isActive ? "text-primary" : ""}`}>
                                            {isActive && <CheckCircleFill style={{marginRight: 3, marginBottom: 5}} />}
                                            {item.CollectionId}
                                        </h5>
                                        <small><strong className="text-secondary">Face count: </strong>{item.FaceCount}</small>
                                    </div>
                                    <p className="mb-1"><strong className="text-secondary">ARN: </strong>{item.CollectionARN}</p>
                                    <small className="d-block"><strong className="text-secondary">Created: </strong>{item.CreationTimestamp}</small>
                                    <small className="d-block"><strong className="text-secondary">Face model: </strong>{item.FaceModelVersion}</small>
                                    <div className={`${isActive ? "d-none" : "d-block"}`} style={{ marginTop: 5 }}>
                                        <button
                                            onClick={() => handleMakeActiveColl(item.CollectionId as string)}
                                            className={`btn btn-sm btn-outline-primary`}>
                                            Make active
                                        </button>
                                        <button
                                            onClick={() => handleDeleteColl(item.CollectionId as string)}
                                            style={{ marginLeft: 5 }}
                                            className={`btn btn-sm btn-outline-danger`}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Modal show={pageProps.showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please wait</Modal.Title>
                </Modal.Header>
                <Modal.Body>Working...</Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    );
};

export default Collections;