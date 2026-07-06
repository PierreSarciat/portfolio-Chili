import React from "react";
import "./BorderWithDot.scss";

const BorderWithDot = ({
    className = "",
    children,
}) => {
    return (
        <div className={`border-with-dot ${className}`}>
            {children}
            <div className="border-with-dot__border" />
        </div>
    );
};

export default BorderWithDot;