import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ marginTop: "10px" }}>
                <Button
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "6px",
                        borderStyle: "dashed",
                    }}
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusOutlined style={{ fontSize: "60px" }} />
                </Button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <TableComponent />
            </div>
        </div>
    );
};

export default AdminUser;
