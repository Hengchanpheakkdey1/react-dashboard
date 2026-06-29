import "./App.css";
import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import Applayout from "./layout/applayout.jsx";
import Createproduct from "./pages/createproduct.jsx";
import Products from "./pages/products.jsx";

function App() {
  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [
        {
          index: true,
          loader: () => redirect("product"),
        },
        {
          path: "product",
          element: <Products />,
        },
        {
          path: "product/create",
          element: <Createproduct />,
        },
        // To be research for Parallel & Intercepting Routing
        // {
        //   path: "product/:id",
        //   element: <ProductDetail />,
        // },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
