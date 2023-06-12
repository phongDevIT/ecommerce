import { Button, Col, Popover } from "antd";
import React from "react";
import {
    WrapperAccount,
    WrapperContentPopup,
    WrapperHeader,
    WrapperTextHeader,
    WrapperTextHeaderSmall,
} from "./style";

import {
    UserOutlined,
    ArrowDownOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import * as UserService from "../../services/UserServices.js";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../redux/slice/userSlice";
import { useState } from "react";
import Loading from "../LoadingComponent/Loading";
const HeaderComponent = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
    };
    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
            <WrapperContentPopup>Thông tin người dùng</WrapperContentPopup>
        </div>
    );
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const handleNavigateLogin = () => {
        navigate("/sign-in");
    };

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
                    <Loading isLoading={loading}>
                        <WrapperAccount>
                            <UserOutlined style={{ fontSize: "30px" }} />
                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {user.name}
                                        </div>
                                    </Popover>
                                </>
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
                    </Loading>
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
