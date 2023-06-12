import { Col } from "antd";
import React from "react";
import {
    WrapperAccount,
    WrapperHeader,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";
import {
    UserOutlined,
    ArrowDownOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HeaderComponent = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };
    console.log("user: ", user);
    return (
        <div
            style={{
                width: "100%",
                background: "rgb(26, 148, 255)",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>PhongDev</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="larger"
                        textButton="Tìm kiếm"
                        placeholder="input search text"
                    />
                </Col>
                <Col
                    span={6}
                    style={{
                        display: "flex",
                        gap: "54px",
                        alignItems: "center",
                    }}
                >
                    <WrapperAccount>
                        <UserOutlined style={{ fontSize: "30px" }} />
                        {user?.name ? (
                            <div style={{ cursor: "pointer" }}>{user.name}</div>
                        ) : (
                            <div
                                onClick={handleNavigateLogin}
                                style={{ cursor: "pointer" }}
                            >
                                <WrapperTextHeaderSmall>
                                    Đăng nhập/Đăng kí
                                </WrapperTextHeaderSmall>
                                <div>
                                    <WrapperTextHeaderSmall>
                                        Tài khoản
                                    </WrapperTextHeaderSmall>
                                    <ArrowDownOutlined />
                                </div>
                            </div>
                        )}
                    </WrapperAccount>
                    <div>
                        <ShoppingCartOutlined
                            style={{ fontSize: "30px", color: "#fff" }}
                        />
                        <WrapperTextHeaderSmall>
                            Giỏ hàng
                        </WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
