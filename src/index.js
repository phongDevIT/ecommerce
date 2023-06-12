// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { store } from "./redux/store";
// import { Provider } from "react-redux";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools/index.esm";
// const queryClient = new QueryClient();
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//     // <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//         <Provider store={store}>
//             <App />
//         </Provider>
//         <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//     // </React.StrictMode>
// );

// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </React.StrictMode>
);

reportWebVitals();
