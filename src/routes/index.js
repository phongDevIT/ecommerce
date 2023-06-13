import AdminPage from "../pages/AdminPage/AdminPage";
import Homepage from "../pages/Homepage/Homepage";
import NotFoundPage from "../pages/NotFouldPage/NotFoundPage";
import ProductDetailsPage from "../pages/OrderPage/OrderPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Profile from "../pages/Profile/Profile";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
    {
        path: "/",
        page: Homepage,
        isShowHeader: true,
    },
    {
        path: "/order",
        page: OrderPage,
        isShowHeader: true,
    },
    {
        path: "/product",
        page: ProductPage,
        isShowHeader: true,
    },
    {
        path: "/:type",
        page: TypeProductPage,
        isShowHeader: true,
    },
    {
        path: "/sign-in",
        page: SignInPage,
        isShowHeader: false,
    },
    {
        path: "/sign-up",
        page: SignUpPage,
        isShowHeader: false,
    },
    {
        path: "/product-details",
        page: ProductDetailsPage,
        isShowHeader: true,
    },
    {
        path: "/profile-user",
        page: Profile,
        isShowHeader: true,
    },
    {
        path: "/system/admin",
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: "*",
        page: NotFoundPage,
    },
];
