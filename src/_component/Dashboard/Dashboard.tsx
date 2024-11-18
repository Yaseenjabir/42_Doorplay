import { useState } from "react";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkThemeGlobal, lightThemeGlobal } from "../../Theme/CreateTheme";
import useStore from "../../store/Store";
const Dashboard = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [nav, setNav] = useState<string | null>(localStorage.getItem("nav"));

  const { darkTheme } = useStore();

  return (
    <ThemeProvider theme={darkTheme ? darkThemeGlobal : lightThemeGlobal}>
      <CssBaseline />
      <div
        style={{ fontFamily: "Poppins" }}
        className="w-full min-h-screen flex h-[calc(100vh-100px)]"
      >
        <Sidebar
          nav={nav}
          setNav={setNav}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
        />
        <Main nav={nav} setShowMenu={setShowMenu} />
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
