import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./style";

const Homepage = () => {
    const arr = ["TV", "Tu Lanh", "LapTop"];
    return (
        <div style={{ padding: "0 120px" }}>
            <WrapperTypeProduct>
                {arr.map((item) => {
                    return <TypeProduct name={item} key={item} />;
                })}
                Homepage
            </WrapperTypeProduct>
        </div>
    );
};

export default Homepage;
