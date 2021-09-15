import { API } from "aws-amplify";
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

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