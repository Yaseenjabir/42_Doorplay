import { useEffect, useState } from "react";
import Main from "./Main/Main";
import Sidebar from "./Sidebar/Sidebar";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkThemeGlobal, lightThemeGlobal } from "../../Theme/CreateTheme";
import useStore from "../../store/Store";
import { useNavigate } from "react-router";
const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);

    if (!parsedUser) {
      navigate("/auth");
    }
  }, []);

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
