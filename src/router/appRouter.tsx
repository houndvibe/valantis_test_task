import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import App from "../pages/App/App";
import InfoPage from "../pages/InfoPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <>Что то пошло не так...</>,
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <InfoPage />
            </Suspense>
          ),
          errorElement: <>Что то пошло не так...</>,
        },
        {
          path: "products",
          element: (
            <Suspense>
              <ProductsPage />
            </Suspense>
          ),
          errorElement: <>Что то пошло не так...</>,
        },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL }
);
export default router;
