import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductServices from "../../services/ProductServices";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        countInstock: "",
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
        type: "",
    });

    const mutation = useMutationHooks((data) => {
        const {
            name,
            price,
            description,
            rating,
            image,
            type,
            countInstock: countInStock,
        } = data;
        const res = ProductServices.createProduct({
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock,
        });
        return res;
    });

    const { data, isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success();
            handleCancel();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess]);

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: "",
            price: "",
            description: "",
            rating: "",
            image: "",
            type: "",
            countInstock: "",
        });
    };

    const onFinish = () => {
        mutation.mutate(stateProduct);
    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
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

            <Modal
                title="Tạo sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        onFinish={onFinish}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your name!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.name}
                                onChange={handleOnchange}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your type!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.type}
                                onChange={handleOnchange}
                                name="type"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Count inStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your count inStock!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInstock}
                                onChange={handleOnchange}
                                name="countInstock"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your count price!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.price}
                                onChange={handleOnchange}
                                name="price"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input your count description!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.description}
                                onChange={handleOnchange}
                                name="description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your count rating!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.rating}
                                onChange={handleOnchange}
                                name="rating"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your count image!",
                                },
                            ]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                fileList={
                                    stateProduct.image
                                        ? [stateProduct.image]
                                        : []
                                }
                            >
                                {" "}
                                <Button>Select File</Button>{" "}
                                {stateProduct?.image && (
                                    <img
                                        src={stateProduct?.image}
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            marginLeft: "10px",
                                        }}
                                        alt="avatar"
                                    />
                                )}{" "}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </Modal>
        </div>
    );
};

export default AdminProduct;
