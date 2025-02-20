import { createBrowserRouter } from "react-router-dom";

import React from "react";
import ProtectedRoute from "./ProtectedRoute";

const LazyOverView = React.lazy(
  () => import("../components/dashboard/main-contents/OverView")
);

const LazyLanding = React.lazy(() => import("../pages/LandingPage"));

const LazyPageNotFound = React.lazy(() => import("../pages/PageNotFound"));

const LazyDashBoard = React.lazy(
  () => import("../components/dashboard/Dashboard")
);
const LazyAllProducts = React.lazy(
  () => import("../components/dashboard/main-contents/AllProducts")
);
const LazyAllCategories = React.lazy(
  () => import("../components/dashboard/main-contents/AllCategory")
);
const LazyAllUsers = React.lazy(
  () => import("../components/dashboard/main-contents/AllUsers")
);
const LazyAddProduct = React.lazy(
  () => import("../components/dashboard/main-contents/AddProduct")
);

const LazyAddCategory = React.lazy(
  () => import("../components/dashboard/main-contents/AddCategory")
);

const LazyAllVendors = React.lazy(
  () => import("../components/dashboard/main-contents/AllVendors")
);

const LazyAllPermissions = React.lazy(
  () => import("../components/dashboard/main-contents/AllPermissions")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <React.Suspense fallback="Loading...">
        <LazyLanding />
      </React.Suspense>
    ),
    errorElement: (
      <React.Suspense fallback="Loading...">
        <LazyPageNotFound />
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <React.Suspense>
          <LazyDashBoard />
        </React.Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyOverView />
          </React.Suspense>
        ),
      },
      {
        path: "overview",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyOverView />
          </React.Suspense>
        ),
      },

      {
        path: "product/all",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAllProducts />
          </React.Suspense>
        ),
      },
      {
        path: "product/add",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAddProduct />
          </React.Suspense>
        ),
      },
      {
        path: "category/all",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAllCategories />
          </React.Suspense>
        ),
      },
      {
        path: "category/add",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAddCategory />
          </React.Suspense>
        ),
      },

      {
        path: "user/all",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAllUsers />
          </React.Suspense>
        ),
      },
      {
        path: "vendor/all",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAllVendors />
          </React.Suspense>
        ),
      },
      {
        path: "permission/all",
        element: (
          <React.Suspense fallback="Loading...">
            <LazyAllPermissions />
          </React.Suspense>
        ),
      },
    ],
  },
]);

export default router;
