import { createTheme } from "@mui/material/styles";

const lightThemeGlobal = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa", // Background color
    },
    text: {
      primary: "#000000", // Text color
    },
  },
});

const darkThemeGlobal = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1B1B1B", // Background color
    },
    text: {
      primary: "#FFFFFF", // Text color
    },
  },
});

export { lightThemeGlobal, darkThemeGlobal };
