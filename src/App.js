import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import * as UserService from "./services/UserServices.js";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { isJsonString } from "./utils";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routes";
import { updateUser } from "./redux/slice/userSlice.js";
function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const { storageData, decode } = handleDecoded();
        if (decode?.id) {
            handleGetDetailsUser(decode?.id, storageData);
        }
        console.log("storageData: ", storageData);
    }, []);

    const handleDecoded = () => {
        let storageData = localStorage.getItem("access_token");
        let decode = {};
        if (storageData && isJsonString(storageData)) {
            storageData = JSON.parse(storageData);
            decode = jwt_decode(storageData);
        }
        return { decode, storageData };
    };
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }));
    };
    UserService.axiosJWT.interceptors.request.use(
        async (config) => {
            const currentTime = new Date();
            const { decode } = handleDecoded();
            if (decode?.exp < currentTime.getTime() / 1000) {
                const data = await UserService.refreshToken();
                config.headers["token"] = `Bearer ${data?.access_token}`;
            }
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
    return (
        <div>
            <Router>
                <Routes>
                    {routes.map((route) => {
                        const Page = route.page;
                        const Layout = route.isShowHeader
                            ? DefaultComponent
                            : Fragment;
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
