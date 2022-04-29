import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    (() => {
      if (localStorage.getItem("login")) {
        setIsLoggedin(true);
        setUserData(JSON.parse(localStorage.getItem("user")));
      }
    })();
  }, []);
  
  return (
    <AuthContext.Provider
      value={{ isLoggedin, setIsLoggedin, userData, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
