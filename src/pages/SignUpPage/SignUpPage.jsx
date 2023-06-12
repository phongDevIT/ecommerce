import React, { useState } from "react";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
    WrapperContainerLeft,
    WrapperContainerRight,
    WrapperTextLight,
} from "./style";
import imageLogo from "../../assets/images/logo-login.png";
import * as UserService from "../../services/UserServices.js";
import * as message from "../../components/Message/Message";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import Loading from "../../components/LoadingComponent/Loading";
import { useEffect } from "react";
const SignUpPage = () => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate("/sign-in");
    };

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleOnChangeConfirmPassword = (value) => {
        setConfirmPassword(value);
    };

    const mutation = useMutationHooks((data) => UserService.signupUser(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    const handleSignUpp = () => {
        mutation.mutate({
            email,
            password,
            confirmPassword,
        });
    };
    useEffect(() => {
        if (isSuccess) {
            message.success();
            handleSignUp();
        } else if (isError) {
            message.error();
        }
    }, [isSuccess, isError]);
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0, 0, 0, 0.53)",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: "800px",
                    height: "445px",
                    borderRadius: "6px",
                    background: "#fff",
                    display: "flex",
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập hoặc tạo tài khoản</p>
                    <InputForm
                        style={{ marginBottom: "10px" }}
                        placeholder="abc@gmail.com"
                        value={email}
                        handleOnChange={handleOnChangeEmail}
                    />

                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: "4px",
                                right: "8px",
                                cursor: "pointer",
                            }}
                        >
                            {isShowPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputForm
                            placeholder="Mật khẩu"
                            style={{ marginBottom: "10px" }}
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            handleOnChange={handleOnChangePassword}
                        />
                    </div>
                    <div style={{ position: "relative" }}>
                        <span
                            onClick={() =>
                                setIsShowConfirmPassword(!isShowConfirmPassword)
                            }
                            style={{
                                zIndex: 10,
                                position: "absolute",
                                top: "4px",
                                right: "8px",
                                cursor: "pointer",
                            }}
                        >
                            {isShowConfirmPassword ? (
                                <EyeFilled />
                            ) : (
                                <EyeInvisibleFilled />
                            )}
                        </span>
                        <InputForm
                            placeholder="Xác nhận mật khẩu"
                            type={isShowConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            handleOnChange={handleOnChangeConfirmPassword}
                        />
                    </div>

                    {data?.status === "ERR" && <span>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <ButtonComponent
                            disabled={
                                !email.length ||
                                !password.length ||
                                !confirmPassword.length
                            }
                            onClick={handleSignUpp}
                            size={40}
                            styleButton={{
                                background: "rgb(255, 57, 69)",
                                height: "48px",
                                width: "100%",
                                border: "none",
                                borderRadius: "4px",
                                margin: "26px 0 10px",
                            }}
                            textButton={"Đăng ký"}
                            styleTextButton={{
                                color: "#fff",
                                fontSize: "15px",
                                fontWeight: "700",
                            }}
                        ></ButtonComponent>
                    </Loading>
                    <p>
                        Bạn đã có tài khoản?{" "}
                        <WrapperTextLight onClick={handleSignUp}>
                            {" "}
                            Đăng nhập
                        </WrapperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image
                        src={imageLogo}
                        preview={false}
                        alt="iamge-logo"
                        height="203px"
                        width="203px"
                    />
                    <h4>Mua sắm tại LTTD</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignUpPage;
