import React from "react";
import "./BorderWithDot.scss";

const BorderWithDot = ({
    className = "",
    children,
    variant = "default",
}) => {
    return (
        <span className={`border-with-dot border-with-dot--${variant} ${className}`}>
            {children}
            <div className="border-with-dot__border" />
        </span>
    );
};

export default BorderWithDot;