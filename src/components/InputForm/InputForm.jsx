import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
    const { placeholder = "Nhập text", ...rests } = props;
    const handleOnChangeInput = (e) => {
        props.handleOnChange(e.target.value);
    };
    return (
        <WrapperInputStyle
            placeholder={placeholder}
            value={props.value}
            onChange={handleOnChangeInput}
            {...rests}
        />
    );
};

export default InputForm;
