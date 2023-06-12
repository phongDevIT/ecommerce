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
} from "./style";
import * as UserService from "../../services/UserServices.js";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slice/userSlice";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const mutation = useMutationHooks((data) => {
        const { id, access_token, ...rests } = data;
        UserService.updateUser(id, rests, access_token);
    });
    const { data, isLoading, isSuccess, isError } = mutation;
    console.log("data: ", data);
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
    const handleOnChangeAvatar = (value) => {
        setAvatar(value);
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

        console.log("update", email, phone, name, avatar, address);
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
                        <InputForm
                            style={{ width: "300px" }}
                            value={avatar}
                            id="avatar"
                            handleOnChange={handleOnChangeAvatar}
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
                </WrapperContentProfile>
            </Loading>
        </div>
    );
};

export default Profile;
