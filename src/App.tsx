import { ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import Homepage from "./Components/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import Cart from "./Components/Pages/Cart";
import Product from "./Components/Pages/Product";
export const appContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { },
});
function App() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem("darkMode");
      return stored ? JSON.parse(stored) : false;
    }
    catch (error) {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  const commonFocusStyles = {
    outline: 'none',
    border: 'none',
    boxShadow: 'none',
    '&:focus': {
      outline: 'none',
      border: 'none',
      boxShadow: 'none',
    },
    '&:focus-visible': {
      outline: '2px solid #ee8915',
      outlineOffset: '2px',
      borderRadius: '4px',
      boxShadow: 'none',
    },
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#ee8915" },
    },
    typography: {
      h4: {
        color: darkMode ? "#ffffff" : "inherit",
      },
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: commonFocusStyles,
        },
        defaultProps: {
          disableRipple: true,
          disableFocusRipple: true,
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: commonFocusStyles,
        },
        defaultProps: {
          disableRipple: true,
          disableFocusRipple: true,
        },
      },
    },
  });

  return (
    <appContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Homepage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="product/:productId" element={<Product />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </appContext.Provider>
  );
}

export default App;