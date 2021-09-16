import { callGraphQLSimpleQuery, callGraphQLWithSimpleInput, PageProps } from "../common/common-types"
import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { DashboardProps } from "../common/dashboard-props";
import { EchoQuery } from "../src/API";
import { echo } from "../src/graphql/queries";

export const Dashboard = (props: PageProps) => {
    return (
        <div>
            Welcome
        </div>
    );
};

export default Dashboard;