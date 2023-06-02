import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import queryClient from "./config/query-client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import CreateFormScreen from "./screens/create-form-screen";
import EditFormScreen from "./screens/edit-form-screen";
import FormsScreen from "./screens/forms-screen";
import ListUsersScreen from "./screens/list-users-screen";
import ResponseFormScreen from "./screens/response-form-screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/questionarios/criar",
    element: <CreateFormScreen />,
  },
  {
    path: "/questionarios",
    element: <FormsScreen />,
  },
  {
    path: "/questionarios/editar/:formId",
    element: <EditFormScreen />,
  },
  {
    path: "/questionarios/responder/:formId",
    element: <ResponseFormScreen />,
  },
  {
    path: "/usuarios",
    element: <ListUsersScreen />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        error: {
          style: {
            backgroundColor: "#fecaca",
          },
        },
        success: {
          style: {
            backgroundColor: "#dcfce7",
          },
        },
      }}
    />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
