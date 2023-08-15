import React, { useContext } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ADMIN_ROUTE,
  APPLICATION_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
} from "./routes/utils";
import { observer } from "mobx-react-lite";

import logo from "../assets/roslogo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context);

  const logout = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    navigate(LOGIN_ROUTE);
  };

  return (
    <Navbar
      expand='lg'
      className='navbar sticky-top'
      style={{ height: "100px", fontSize: "18px" }}
      bg='dark'
      variant='dark'
    >
      <Container fluid className='ms-5 me-5'>
        <NavLink to={HOME_ROUTE}>
          <img src={logo} height='60' width='60' alt='logo' />
        </NavLink>

        {user.isAuth ? (
          <Nav className='ml-auto'>
            <Nav.Link
              className='ms-3'
              onClick={() => {
                navigate(APPLICATION_ROUTE);
              }}
            >
              Подать заявку
            </Nav.Link>
            {user.role === "ADMIN" && (
              <Nav.Link className='ms-3' onClick={() => navigate(ADMIN_ROUTE)}>
                Панель управления
              </Nav.Link>
            )}
            <Nav.Link
              className='ms-3'
              onClick={() => {
                navigate(PROFILE_ROUTE);
              }}
            >
              Профиль
            </Nav.Link>
            <Nav.Link
              className='ms-3'
              onClick={() => {
                logout();
              }}
            >
              Выйти
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link
              className='ms-3'
              onClick={() => {
                navigate(LOGIN_ROUTE);
              }}
            >
              Войти
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default observer(NavBar);
