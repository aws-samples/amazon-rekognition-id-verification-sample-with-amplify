import { callGraphQLSimpleQuery, callGraphQLWithSimpleInput } from "../common/common-types"
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { DashboardProps } from "../common/dashboard-props";
import { EchoQuery } from "../src/API";
import { echo } from "../src/graphql/queries";

const onBtnClick = async() => {
    console.log("In OnBtnClick");

    const variables = {msg: 'test23'};
    const { data } = await callGraphQLSimpleQuery<EchoQuery>(
        {
            query: echo,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            variables: variables,
        }
    );

    console.log(data);
}

export const UserDetails = (props: DashboardProps) => {
    return (
        <div>
            This is user details - {props.username}
            <div>
                <button className="btn btn-primary" onClick={onBtnClick}>Test</button>
            </div>
        </div>
    );
};

export default UserDetails;