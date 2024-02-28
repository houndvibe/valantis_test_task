import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App/App";
import InfoPage from "../pages/InfoPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import { Suspense } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <>ErrorPage</>,
    children: [
      {
        path: "info",
        element: (
          <Suspense>
            <InfoPage />
          </Suspense>
        ),
        errorElement: <>ErrorPage</>,
      },
      {
        path: "products",
        element: (
          <Suspense>
            <ProductsPage />
          </Suspense>
        ),
        errorElement: <>ErrorPage</>,
      },
    ],
  },
]);
export default router;
