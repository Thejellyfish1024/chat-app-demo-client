import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><App></App></PrivateRoute>,
    },
    {
        path: "/login",
        element : <Login></Login>
    }
]);