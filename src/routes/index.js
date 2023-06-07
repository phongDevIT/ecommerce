import Homepage from "../pages/Homepage/Homepage";
import NotFoundPage from "../pages/NotFouldPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductPage from "../pages/ProductPage/ProductPage";

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
        path: "*",
        page: NotFoundPage,
    },
];
