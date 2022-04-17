import { useContext, createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [token, setToken] = useState("");
  
  return (
    <AuthContext.Provider
      value={{ isLoggedin, setIsLoggedin, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
