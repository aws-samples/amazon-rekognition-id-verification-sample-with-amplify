import CustomBar from "../components/custom-bar-chart"
import SampleTable from "../components/sample-table";
import { DashboardProps } from "../common/dashboard-props";

export const DashboardComponent = () => {
    return (
        <div>
            <CustomBar></CustomBar>

            <h3>Section title</h3>
            <div className="table-responsive">
                <SampleTable />
            </div>
        </div>
    );
};

export default DashboardComponent;