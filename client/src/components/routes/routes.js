import AdminPage from "../../pages/AdminPage";
import Applications from "../../pages/Applications";
import AuthRouter from "../../pages/AuthRouter";
import CheckUsers from "../../pages/CheckUsers";
import Home from "../../pages/Home";
import Application from "../../pages/multiform/Application";
import Profile from "../../pages/Profile";
import {
  ADMIN_ROUTE,
  APPLICATION_ROUTE,
  CHECKUSERS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  PROFILE_ROUTE,
  APPLICATIONS_ROUTE,
} from "./utils";

export const authRoutes = [
  {
    path: APPLICATION_ROUTE,
    Component: Application,
  },

  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },

  {
    path: LOGIN_ROUTE,
    Component: AuthRouter,
  },

  {
    path: REGISTER_ROUTE,
    Component: AuthRouter,
  },
];

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: AdminPage,
  },

  {
    path: CHECKUSERS_ROUTE,
    Component: CheckUsers,
  },

  {
    path: APPLICATIONS_ROUTE,
    Component: Applications,
  },
];
