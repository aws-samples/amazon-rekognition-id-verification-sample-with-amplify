import React from "react";
import { DashboardProps } from '../common/dashboard-props'

export const PageHeading = (props: DashboardProps) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h1">{props.pageHeading}</h1>
        </div>
    );
};

export default PageHeading;