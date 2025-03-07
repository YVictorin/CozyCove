import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//hook used for simplicity and to remove unneccessary code duplication in the future
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;