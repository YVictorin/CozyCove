import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth() || {};
    const location = useLocation();

    return (
        //this RequireAuth will protect the child components nested inside of it based on if auth has the proper role
        // auth?.email?.some(role => allowedRoles?.includes(role))
        auth?.email == allowedRoles
        ? <Outlet/>  
        : !auth?.accessToken 
             ? <Navigate to="/unauthorized" state={{ from: location }} replace/> // User exists but doesn't have the right role
             : <Navigate to="/login" state={{ from: location }} replace/>   //extra attr make enables the browser's back button to work
    
    )
}
export default RequireAuth;