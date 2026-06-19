import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Applayout from './layout/applayout.jsx'
import Home from './pages/home.jsx'
import Createproduct from './pages/createproduct.jsx'
import Products from './component/products.jsx'
import ProductDetail from './component/productsDetails.jsx'



const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "product",
        element: <Products />,
      },
      {
        path: "product/create",
        element: <Createproduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },

    ],
  },
]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
