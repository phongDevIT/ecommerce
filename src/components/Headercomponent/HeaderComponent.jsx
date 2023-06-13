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
import { useEffect } from "react";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        setLoading(true);
        await UserService.logoutUser();
        dispatch(resetUser());
        setLoading(false);
    };
    useEffect(() => {
        setLoading(true);
        setUserName(user?.name);
        setLoading(false);
        setUserAvatar(user?.avatar);
    }, [user?.name, user?.avatar]);
    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>
                Đăng xuất
            </WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate("/profile-user")}>
                Thông tin người dùng
            </WrapperContentPopup>
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => navigate("/system/admin")}>
                    Quản lí hệ thống
                </WrapperContentPopup>
            )}
        </div>
    );
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
            <WrapperHeader
                style={{
                    justifyContent:
                        isHiddenSearch && isHiddenCart
                            ? "space-between"
                            : "unset",
                }}
            >
                <Col span={5}>
                    <WrapperTextHeader>PhongDev</WrapperTextHeader>
                </Col>
                {!isHiddenSearch && (
                    <Col span={13}>
                        <ButtonInputSearch
                            size="larger"
                            textButton="Tìm kiếm"
                            placeholder="input search text"
                        />
                    </Col>
                )}
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
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt="userAvatar"
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <UserOutlined style={{ fontSize: "30px" }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: "pointer" }}>
                                            {userName?.length
                                                ? user?.name
                                                : user?.email}
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
                    {!isHiddenCart && (
                        <div>
                            <ShoppingCartOutlined
                                style={{ fontSize: "30px", color: "#fff" }}
                            />
                            <WrapperTextHeaderSmall>
                                Giỏ hàng
                            </WrapperTextHeaderSmall>
                        </div>
                    )}
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;
