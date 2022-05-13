import { useContext, createContext, useState, useEffect } from "react";

const defaultTheme = { theme: "light" };

const ThemeContext = createContext(defaultTheme);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const Toggle = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    } else {
      setTheme("dark");
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    }
  };
  useEffect(() => {
    (async () => {
      const themes = localStorage.getItem("theme");
      if (themes === "light") {
        document.body.classList.add("light-theme");
        setTheme("light");
      } else {
        document.body.classList.add("dark-theme");
        setTheme("dark");
      }
    })();
  }, []);
  return (
    <ThemeContext.Provider value={{ theme, Toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { useTheme, ThemeProvider };
