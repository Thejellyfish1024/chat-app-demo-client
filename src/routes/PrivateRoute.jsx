/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({ children }) => {
    // console.log(children);
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return (
            <div className="w-screen flex justify-center">
               Loading......
            </div>
        );
    }
    if (user) {
        return children;
    }
    return (
        <div>
            <Navigate state={location?.pathname} to="/login"></Navigate>
        </div>
    );
};

export default PrivateRoute;