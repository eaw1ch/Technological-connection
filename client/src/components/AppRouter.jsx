import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes, adminRoutes } from "./routes/routes";
import { HOME_ROUTE } from "./routes/utils";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} Component={Component} />;
        })}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} Component={Component} />;
      })}
      {user.role === "ADMIN" &&
        adminRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} Component={Component} />;
        })}
      <Route path='*' element={<Navigate to={HOME_ROUTE} />} />
    </Routes>
  );
};

export default observer(AppRouter);
