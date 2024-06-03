import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#212121", // Dark primary color
    },
    secondary: {
      main: "#f50057", // Accent color
    },
    background: {
      default: "#f5f5f5", // Light background color
      paper: "#ffffff", // Light paper color
    },
    text: {
      primary: "#000000", // Dark text color for contrast
      secondary: "#757575", // Secondary text color
    },
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </ThemeProvider>
  );
};

export default Layout;
