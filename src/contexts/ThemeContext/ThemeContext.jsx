import { useContext, createContext, useState, useEffect } from "react";
import { setMode } from "../../utils";

const defaultTheme = { theme: "light-theme" };

const ThemeContext = createContext(defaultTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light-theme");
  const toggle = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      setMode("light-theme");
    } else {
      setTheme("dark-theme");
      setMode("dark-theme");
    }
  };
  useEffect(() => {
    (async () => {
      const themes = localStorage.getItem("theme");
      if (themes === "light-theme") {
        setTheme("light-theme");
      } else {
        setTheme("dark-theme");
      }
    })();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
