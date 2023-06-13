import { Button, Form, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import { createProduct } from "../../services/ProductServices";
import * as ProductServices from "../../services/ProductServices";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";

const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
        type: "",
        countInStock: "",
    });

    const mutation = useMutationHooks((data) => {
        const { name, price, description, rating, image, type, countInStock } =
            data;
        const res = ProductServices.createProduct(
            name,
            price,
            description,
            rating,
            image,
            type,
            countInStock
        );
        return res;
    });
    const { data, isLoading, isSuccess, isError } = mutation;
    console.log("data", data);
    useEffect(() => {
        if (isSuccess && data?.status === "OK") {
            message.success();
            handleCancel();
            setStateProduct();
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
            countInStock: "",
        });
    };
    const onFinish = () => {
        mutation.mutate(stateProduct);
        // createProduct();
        // console.log("onFinish:", stateProduct);
    };
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj);
            setStateProduct({
                ...stateProduct,
                image: file.preview,
            });
        }
    };
    return (
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{ marginTop: "10px" }}>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "6px",
                        borderStyle: "dashed",
                    }}
                >
                    <PlusOutlined style={{ fontSize: "60px" }} />
                </Button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <TableComponent />
            </div>
            <Modal
                title="Tạo sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                okText=""
            >
                <Loading isLoading={isLoading}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
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
                                onChange={handleOnChange}
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
                                onChange={handleOnChange}
                                name="type"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Count InStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your count InStock!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInstock}
                                onChange={handleOnChange}
                                name="countInstock"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your price!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.price}
                                onChange={handleOnChange}
                                name="price"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your rating!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.rating}
                                onChange={handleOnChange}
                                name="rating"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your description!",
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.description}
                                onChange={handleOnChange}
                                name="description"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your image!",
                                },
                            ]}
                        >
                            <WrapperUploadFile
                                onChange={handleOnChangeAvatar}
                                maxCount={1}
                            >
                                <Button>Select File</Button>
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
                                )}
                            </WrapperUploadFile>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
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
