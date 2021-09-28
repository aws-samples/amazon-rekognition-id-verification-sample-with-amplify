import { useState } from "react";

export interface AlertProps {
    message: string,
}

const Alert = (props: AlertProps) => {
    const [state, setState] = useState({ showing: true });

    const onClose = () => {
        setState({ showing: false });
    };

    return (
        <div className={`alert alert-danger alert-dismissible fade show ${state.showing ? "d-block" : "d-none"}`} role="alert">
            <strong>Error!</strong> {props.message}
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                onClick={onClose}
                aria-label="Close">
            </button>
        </div>
    )
}

export default Alert;