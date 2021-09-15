import { callGraphQLSimpleQuery, callGraphQLWithSimpleInput } from "../common/common-types"
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { useAsyncEffect } from "use-async-effect";
import { DashboardProps } from "../common/dashboard-props";
import { CreatecollectionMutation, ListcollectionsQuery, CollectionResponse, DescribecollectionQuery, DescribeCollectionResponse } from "../src/API";
import { listcollections, describecollection } from "../src/graphql/queries";
import { createcollection } from "../src/graphql/mutations";
import { useState, SetStateAction, Dispatch } from "react";

interface CollectionPageProps {
    collectionId: string,
    collections: DescribeCollectionResponse[],
    fetchState: string,
    isFetching: boolean,
}

function handleCollectionIdChange(event: any, state: CollectionPageProps, setState: Dispatch<SetStateAction<CollectionPageProps>>) {
    setState({ collectionId: event.target.value, collections: state.collections, fetchState: 'handleCollectionIdChange', isFetching: state.isFetching });
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

const onAddCollection = async (collectionId: string) => {

    const variables = { collectionId: collectionId };
    const { data } = await callGraphQLSimpleQuery<CreatecollectionMutation>(
        {
            query: createcollection,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: variables,
        }
    );
}

export const Collections = (props: DashboardProps) => {
    const [pageProps, setstate] = useState({ collectionId: '', collections: [] as DescribeCollectionResponse[], fetchState: 'initial', isFetching: true });

    useAsyncEffect(async isMounted => {
        if (pageProps.fetchState == 'initial') {
            //setstate({collectionId: pageProps.collectionId, collections: [], fetchState: 'initial', isFetching: true});
            const props = await fetchCollections();
            if (!isMounted()) return;

            setstate({ collectionId: pageProps.collectionId, collections: props, fetchState: 'postLoad', isFetching: false });
        }
    });

    return (
        <div>
            <div className={`${pageProps.isFetching ? "d-none" : "d-block"}`}>
                <input type="text" value={pageProps.collectionId} onChange={(e) => handleCollectionIdChange(e, pageProps, setstate)} placeholder="New collection" autoFocus />
                <button
                    className="btn btn-primary"
                    style={{ marginRight: 3, marginLeft: 15, marginBottom: 3 }}
                    onClick={() => onAddCollection(pageProps.collectionId)}>
                    Add
                </button>
            </div>
            <div className={`${pageProps.isFetching ? "d-block" : "d-none"}`}>
                Fetching. Please wait...
            </div>
            <div className={`${pageProps.isFetching ? "d-none" : "d-block"}`}>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Collection Id</th>
                            <th>Face count</th>
                            <th>Face model version</th>
                            <th>Creation timestamp</th>
                            <th>Collection ARN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageProps.collections.map((item, index) => {
                            return (
                                <tr key={item.CollectionId}>
                                    <td>{item.CollectionId}</td>
                                    <td>{item.FaceCount}</td>
                                    <td>{item.FaceModelVersion}</td>
                                    <td>{item.CreationTimestamp}</td>
                                    <td>{item.CollectionARN}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Collections;