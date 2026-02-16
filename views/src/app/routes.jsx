import { createBrowserRouter, redirect } from "react-router";

import App from "./App";
import { products, ErrorPage, auth, users } from "../features";
import { store } from "./store";

// products
const { AllProducts, ProductById } = products.component;
const { getAllProduct, getProductById } = products.api;
// auth
const { Login, Register } = auth.component;
const { logoutAPI } = auth.api;
// users
const { getUser } = users.api;
const { User, ViewProfile, UpdateUserInfo } = users.component;

const handleDispatch = async ({ api, data }) => {
  await store.dispatch(api(data)).unwrap();
  return null;
};

const fallback = () => {
  return <div>Loading data ...</div>;
};

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      await handleDispatch({ api: getUser });
    },
    HydrateFallback: () => <div>...</div>,
    errorElement: <ErrorPage />,
    children: [
      // Homepage
      {
        index: true,
        element: <AllProducts />,
        loader: async () => await handleDispatch({ api: getAllProduct }),
        HydrateFallback: fallback,
      },
      // Product Page
      {
        path: "product",
        children: [
          {
            path: ":productId",
            element: <ProductById />,
            loader: async ({ params }) =>
              await handleDispatch({ api: getProductById, data: params }),
            HydrateFallback: fallback,
          },
        ],
      },
      {
        path: "user",
        element: <User />,
        children: [
          {
            index: true,
            element: <ViewProfile />,
            loader: async () => await handleDispatch({ api: getUser }),
          },
          {
            path: "update",
            element: <UpdateUserInfo />,
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    children: [
      // Login Page
      {
        path: "login",
        element: <Login />,
      },
      //  Registration Page
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        action: async () => {
          // fetch
          await logoutAPI();
          return redirect("/");
        },
      },
    ],
  },
]);
