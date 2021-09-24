import { PageProps } from "../common/common-types"

export const Dashboard = (props: PageProps) => {
    return (
        <div>
            <div>
                <h2>Register new user flow</h2>
                <ol>
                    <li>Check image quality</li>
                </ol>
                <span style={{ marginRight: 10 }}>Register new user:</span>
                <button className="btn btn-info">
                    Try it out
                </button>
            </div>
            <hr />
            <div>
                <h2>Register new user with ID card flow</h2>
                <ol>
                    <li>Check image quality</li>
                </ol>
                <span style={{ marginRight: 10 }}>Register new user with id card:</span>
                <button className="btn btn-info">
                    Try it out
                </button>
            </div>
        </div>
    );
};

export default Dashboard;