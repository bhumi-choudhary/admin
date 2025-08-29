import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

import React, { useState } from "react";
import { SnackbarProvider } from "notistack";

const Root = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <StrictMode>
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              {/* pass darkMode + toggleDarkMode to App */}
              <App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Root />);
