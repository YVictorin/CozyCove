import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth() || {};
    const location = useLocation();  

    return allowedRoles?.includes(auth?.email) // Check if user's email is in the allowedRoles array
        ? <Outlet />  // If allowed, render the requested page
        : auth?.email  // If logged in but not authorized, redirect to unauthorized page
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />; // If not logged in, go to login page
};

export default RequireAuth;
