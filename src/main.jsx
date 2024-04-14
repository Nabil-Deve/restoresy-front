import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import Search from "./pages/SearchPage.jsx";
import RestoPage from "./pages/RestoPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import BookingConfirmation from "./pages/BookingConfirmation.jsx";
import ModifyUserPage from "./pages/ModifyUserPage.jsx";
import RatingPage from "./pages/RatingPage.jsx";
import RatingReply from "./pages/RatingReply.jsx";
import ModifyRestoPage from "./pages/ModifyRestoPage.jsx";
import SignUpResto from "./pages/SignUpResto.jsx";
import ConnectResto from "./pages/ConnectResto.jsx";
import RestoDashboard from "./pages/RestoDashboard.jsx";
import UserBookings from "./pages/UserBookings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  { path: "/search", element: <Search /> },
  { path: "/restopage/:restoId", element: <RestoPage /> },
  { path: "/bookingpage/:restoId", element: <BookingPage /> },
  { path: "/bookingconfirmation", element: <BookingConfirmation /> },
  { path: "/modifyuserpage", element: <ModifyUserPage /> },
  { path: "/ratingpage/:restoId", element: <RatingPage /> },
  { path: "/ratingreply", element: <RatingReply /> },
  { path: "/signupresto", element: <SignUpResto /> },
  { path: "/modifyrestopage", element: <ModifyRestoPage /> },
  { path: "/connectresto", element: <ConnectResto /> },
  { path: "/restodashboard", element: <RestoDashboard /> },
  { path: "/userbookings", element: <UserBookings /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
