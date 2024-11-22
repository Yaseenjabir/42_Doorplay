import { useEffect, useState } from "react";
import Login from "./login/Login";
import Signup from "./signup/Signup";
import { useNavigate } from "react-router";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const parsedUser = user && JSON.parse(user);

    if (parsedUser) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      {isLogin ? (
        <Login setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </>
  );
};

export default Auth;
