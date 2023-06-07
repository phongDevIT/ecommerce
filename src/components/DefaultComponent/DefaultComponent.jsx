import React from "react";
import HeaderComponent from "../Headercomponent/HeaderComponent";

const DefaultComponent = ({ children }) => {
    return (
        <div>
            <HeaderComponent />
            {children}
        </div>
    );
};

export default DefaultComponent;
