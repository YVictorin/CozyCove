import { createContext, useState } from 'react';

export const AuthContext = createContext(); // Add default value if needed

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({}); // Initialize with your auth structure
  
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;