import { $host, $authHost } from "./axios";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  await $host.post("api/user/registration", {
    email,
    password,
    role: "USER",
  });
  return;
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const authMe = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
