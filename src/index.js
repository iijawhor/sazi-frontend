import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store/store";
import { AssignmentPage, Home, Login } from "./exportFiles";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/my-class",
        element: "My Class"
      },
      {
        path: "/assignments",
        element: <AssignmentPage />
      },
      {
        path: "/attendance",
        element: "attendance"
      },
      {
        path: "/grade-book",
        element: "Grade Book"
      },
      {
        path: "/calender",
        element: "Calender"
      },
      {
        path: "/notification",
        element: "Notification"
      },
      {
        path: "/profile",
        element: "Profile"
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
