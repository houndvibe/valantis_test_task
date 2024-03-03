import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import App from "../pages/App/App";
import InfoPage from "../pages/InfoPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>Something went wrong...</>,
    children: [
      {
        path: "info",
        element: (
          <Suspense>
            <InfoPage />
          </Suspense>
        ),
        errorElement: <>Something went wrong...</>,
      },
      {
        path: "products",
        element: (
          <Suspense>
            <ProductsPage />
          </Suspense>
        ),
        errorElement: <>Something went wrong...</>,
      },
    ],
  },
]);
export default router;
