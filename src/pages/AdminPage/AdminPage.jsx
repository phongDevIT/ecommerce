import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import {
    UserOutlined,
    AppstoreOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import HeaderComponent from "../../components/Headercomponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";

const AdminPage = () => {
    const items = [
        getItem("Người dùng", "user", <UserOutlined />),
        getItem("Sản phẩm", "product", <AppstoreOutlined />),
        getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
    ];

    const rootSubmenuKeys = ["user", "product"];
    const [openKeys, setOpenKeys] = useState(["user"]);
    const [keySelected, setKeySelected] = useState("");

    const renderPage = (key) => {
        switch (key) {
            case "user":
                return <AdminUser />;
            case "product":
                return <AdminProduct />;
            case "order":
                return <OrderAdmin />;
            default:
                return <></>;
        }
    };

    const handleOnCLick = ({ key }) => {
        setKeySelected(key);
    };
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: "flex" }}>
                <Menu
                    style={{
                        width: "256px",
                        boxShadow: "1px 1px 2px #ccc",
                        height: "100vh",
                    }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    onClick={handleOnCLick}
                />
                <div style={{ flex: 1, padding: "15px" }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
