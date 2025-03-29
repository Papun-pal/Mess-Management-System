import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Fixed import
import Home from './pages/Home';
import Signup from './pages/User/Signup.jsx';
import './index.css';
import App from './App.jsx';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import AdminLogin from './pages/Admin/Adminlogin.jsx';
import UserLogin from './pages/User/Userlogin.jsx';
import Userhome from './pages/User/Userhome.jsx';
import Currentbill from './pages/User/Currentbill.jsx';
import Gasbill from './pages/User/Gasbill.jsx';
import Weeklyfund from './pages/User/Weeklyfund.jsx';
import Myaccount from './pages/User/Myaccount.jsx';
import Meallist from './pages/User/Meallist.jsx';
import Productlist from './pages/User/Productlist.jsx';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminHome from './pages/Admin/AdminHome.jsx';
import AdminRegister from './pages/Admin/AdminRegister.jsx';
import AdminCurrentbill from './pages/Admin/AdminCurrentbill.jsx';
import AdminGasbill from './pages/Admin/AdminGasbill.jsx';
import AdminWeeklyfund from './pages/Admin/AdminWeeklyfund.jsx';
import AdminProductlist from './pages/Admin/AdminProductlist.jsx';
import AdminMilllist from './pages/Admin/AdminMilllist.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/user-login",
        element: <UserLogin />,
      },
      {
        path: "/admin-login",
        element: <AdminLogin/>
      },
      {
        path: "/userhome",
        element: <Userhome />,
      },
      {
        path: "/myaccount",
        element: <Myaccount />,
      },
      {
        path: "/current-bill",
        element: <Currentbill />,
      },
      {
        path: "/gas-bill",
        element: <Gasbill />,
      },
      {
        path: "/weekly-fund",
        element: <Weeklyfund />,
      },
      {
        path: "/meal-list",
        element: <Meallist />,
      },
      {
        path: "/product-list",
        element: <Productlist />
      },
      {
        path: "/admin/home",
        element: <AdminHome />
      },
      {
        path: "/admin-register",
        element: <AdminRegister />
      },
      {
        path: "/admin/CurrentBill",
        element: <AdminCurrentbill/>
      },
      {
        path: "/admin/gasBill",
        element: <AdminGasbill/>
      },
      {
        path: "/admin/weekly-fund",
        element: <AdminWeeklyfund/>
      },
      {
        path: "/admin/meal-list",
        element: <AdminMilllist/>
      },
      {
        path: "/admin/product-list",
        element: <AdminProductlist/>
      }
     

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </AdminAuthProvider>
  </StrictMode>
);
