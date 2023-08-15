import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { observer } from "mobx-react-lite";

import { Context } from "..";
import { registration, login } from "../axios/userLogin";
import { HOME_ROUTE, LOGIN_ROUTE } from "../components/routes/utils";

import Login from "./auth/Login";
import Register from "./auth/Register";

const Auth = () => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === LOGIN_ROUTE;

  const authFunction = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
        alert("Аккаунт успешно зарегистрирован");
        navigate(LOGIN_ROUTE);
        return;
      }
      user.setUser(user);
      user.setIsAuth(true);
      user.setRole(data.role);
      navigate(HOME_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div>
      {isLogin ? (
        <Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          authFunction={authFunction}
        />
      ) : (
        <Register
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          authFunction={authFunction}
        />
      )}
    </div>
  );
};

export default observer(Auth);
