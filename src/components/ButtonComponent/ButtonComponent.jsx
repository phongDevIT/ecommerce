import { Button } from "antd";
import React from "react";

const ButtonComponent = ({
    size,
    styleButton,
    styleTextButton,
    textButton,
    ...rests
}) => {
    return (
        <div>
            <Button size={size} {...rests} style={styleButton}>
                <span style={styleTextButton}>{textButton}</span>
            </Button>
        </div>
    );
};

export default ButtonComponent;
