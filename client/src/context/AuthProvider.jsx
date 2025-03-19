import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Load auth state from localStorage or initialize as empty object
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : {};
  });

  // Persist auth state changes in localStorage
  useEffect(() => {
    if (auth?.email) {
      localStorage.setItem("auth", JSON.stringify({ email: auth.email, accessToken: auth?.accessToken }));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]); // Runs whenever auth state changes

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
