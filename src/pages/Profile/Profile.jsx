import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
    WrapperContentProfile,
    WrapperHeader,
    WrapperInput,
    WrapperLabel,
    WrapperUploadFile,
} from "./style";
import * as UserService from "../../services/UserServices.js";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slice/userSlice";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
const Profile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    // const [avatar, setAvatar] = useState("");
    const [avatar, setAvatar] = useState(null);

    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });
    const { data, isLoading, isSuccess, isError } = mutation;
    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user]);
    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangeName = (value) => {
        setName(value);
    };
    const handleOnChangePhone = (value) => {
        setPhone(value);
    };
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    };
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (file && file.originFileObj) {
            file.preview = await getBase64(file.originFileObj);
            setAvatar(file.preview);
        }
    };

    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            email,
            phone,
            name,
            avatar,
            address,
            access_token: user?.access_token,
        });
    };
    return (
        <div style={{ width: "1270px", margin: "0 auto", height: "500px" }}>
            <WrapperHeader>Thông tin người dùng</WrapperHeader>
            <Loading isLoading={isLoading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm
                            style={{ width: "300px" }}
                            value={name}
                            id="name"
                            handleOnChange={handleOnChangeName}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: "30px",
                                width: "fit-content",
                                borderRadius: "4px",
                                padding: "2px 6px 6px",
                            }}
                            textButton={"Cập nhật"}
                            styleTextButton={{
                                color: "rgb(24, 148, 255)",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm
                            style={{ width: "300px" }}
                            value={email}
                            id="email"
                            handleOnChange={handleOnChangeEmail}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: "30px",
                                width: "fit-content",
                                borderRadius: "4px",
                                padding: "2px 6px 6px",
                            }}
                            textButton={"Cập nhật"}
                            styleTextButton={{
                                color: "rgb(24, 148, 255)",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm
                            style={{ width: "300px" }}
                            value={phone}
                            id="phone"
                            handleOnChange={handleOnChangePhone}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: "30px",
                                width: "fit-content",
                                borderRadius: "4px",
                                padding: "2px 6px 6px",
                            }}
                            textButton={"Cập nhật"}
                            styleTextButton={{
                                color: "rgb(24, 148, 255)",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm
                            style={{ width: "300px" }}
                            value={address}
                            id="address"
                            handleOnChange={handleOnChangeAddress}
                        />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: "30px",
                                width: "fit-content",
                                borderRadius: "4px",
                                padding: "2px 6px 6px",
                            }}
                            textButton={"Cập nhật"}
                            styleTextButton={{
                                color: "rgb(24, 148, 255)",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </WrapperInput>
                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile
                            onChange={handleOnChangeAvatar}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>
                                Select File
                            </Button>
                        </WrapperUploadFile>
                        {avatar && (
                            <img
                                src={avatar}
                                style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                }}
                                alt="avatar"
                            />
                        )}
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: "30px",
                                width: "fit-content",
                                borderRadius: "4px",
                                padding: "2px 6px 6px",
                            }}
                            textButton={"Cập nhật"}
                            styleTextButton={{
                                color: "rgb(24, 148, 255)",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    );
};

export default Profile;
