import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Applayout from './layout/applayout.jsx'
import Createproduct from './pages/createproduct.jsx'
import Products from './component/products.jsx'
import ProductDetail from './component/productsDetails.jsx'

function App() {




  const router = createBrowserRouter([
    {
      element: <Applayout />,
      children: [

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



  return <RouterProvider router={router} />
}

export default App
