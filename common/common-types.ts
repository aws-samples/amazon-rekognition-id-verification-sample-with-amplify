import { API } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { CreateConfigEntryMutation, DeletecollectionMutation, GetConfigEntryQuery, UpdateConfigEntryMutation } from "../src/API";
import { getConfigEntry } from "../src/graphql/queries";
import { createConfigEntry, deletecollection, updateConfigEntry } from "../src/graphql/mutations";

export interface PageProps {
    username: string,
    pageHeading: string
}

export interface GraphQLOptionsInput {
    input: object
}

export interface GraphQLOptions {
    variables?: GraphQLOptionsInput;
    authMode?: GRAPHQL_AUTH_MODE;
    query: any;
}

export interface GraphQLOptionsWithFilter {
    variables?: any;
    authMode?: GRAPHQL_AUTH_MODE;
    query: any;
}

export interface GraphQLOptionsFilter {
    filter: object
}

export async function callGraphQL<T>(params: GraphQLOptions): Promise<GraphQLResult<T>> {
    return (await API.graphql(params)) as GraphQLResult<T>;
}

export async function callGraphQLSimpleQuery<T>(params: any): Promise<GraphQLResult<T>> {
    return (await API.graphql(params)) as GraphQLResult<T>;
}

export async function callGraphQLWithSimpleInput<T>(params: GraphQLOptionsWithFilter): Promise<GraphQLResult<T>> {
    return (await API.graphql(params)) as GraphQLResult<T>;
}

export async function callGraphQLWithSSR<T>(ssr: any, params: GraphQLOptions): Promise<GraphQLResult<T>> {
    return (await ssr.API.graphql(params)) as GraphQLResult<T>;
}

export async function getDefaultCollection() {
    let input = {
        configroot: 'config',
        configid: 'defaultcollection'
    };

    // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
    const { data } = await callGraphQLWithSimpleInput<GetConfigEntryQuery>(
        {
            query: getConfigEntry,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: input
        }
    );

    return data;
}

export async function setDefaultCollection(collectionId: string, doCreate: boolean = false) {
    var configEntry = {
        configroot: 'config',
        configid: 'defaultcollection',
        value: collectionId,
    };

    var response = {
        Success: false,
        Message: ''
    };

    if (doCreate) {
        // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
        const { data } = await callGraphQL<CreateConfigEntryMutation>(
            {
                query: createConfigEntry,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: {
                    input: configEntry
                }
            }
        );

        if (data &&
            data.createConfigEntry &&
            data.createConfigEntry.value === collectionId) {
            response.Success = true;
        } else {
            response.Success = false;
            response.Message = "Unable to create active collection entry";
        }
    } else {
        // https://dev.to/rmuhlfeldner/how-to-use-an-aws-amplify-graphql-api-with-a-react-typescript-frontend-2g79
        const { data } = await callGraphQL<UpdateConfigEntryMutation>(
            {
                query: updateConfigEntry,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                variables: {
                    input: configEntry
                }
            }
        );

        if (data &&
            data.updateConfigEntry &&
            data.updateConfigEntry.value === collectionId) {
            response.Success = true;
        } else {
            response.Success = false;
            response.Message = "Unable to update active collection entry";
        }
    }

    return response;
}

export async function deletecollectionFunc(collectionId: string) {
    var vars = {
        collectionId: collectionId
    };

    var response = {
        Success: false,
        Message: ''
    };

    const { data } = await callGraphQLSimpleQuery<DeletecollectionMutation>(
        {
            query: deletecollection,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: vars
        }
    );

    if (data &&
        data.deletecollection &&
        data.deletecollection.CollectionId as string === collectionId) {
        response.Success = true;
    } else {
        response.Success = false;
        response.Message = "Unable to delete collection entry";
    }

    return response;
}