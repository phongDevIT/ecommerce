import { Button } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
const ButtonInputSearch = (props) => {
    const {
        size,
        placeholder,
        textButton,
        backgroundColor = "#fff",
        backgroundButton = "rgb(13,92,182)",
        colorButton = "#fff",

        bordered,
    } = props;
    return (
        <div style={{ display: "flex" }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColor }}
            />
            <ButtonComponent
                size={size}
                icon={<SearchOutlined color={colorButton} />}
                styleButton={{
                    border: "none",
                    background: backgroundButton,
                    color: colorButton,
                }}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
            ></ButtonComponent>
        </div>
    );
};

export default ButtonInputSearch;
