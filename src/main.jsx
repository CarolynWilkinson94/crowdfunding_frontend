import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import '../styles.css'

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CreateFundraiserPage from "./pages/CreateFundraiserPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ForbiddenPage from "./pages/ForbiddenPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      </>
    ),
    children: [
      {path: "/", element: <HomePage />},
      {path: "/login", element: <LoginPage />},
      {path: "/fundraiser/:id", element: <FundraiserPage />},
      {path: "/signup", element: <SignUpPage />},
      {path: "/create", element: <CreateFundraiserPage />},
      {path: "/about", element: <AboutPage />},
      {path: "/forbidden", element: <ForbiddenPage />},
      {path: "*", element: <NotFoundPage />},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
