import { $authHost } from "./axios";

export const getPersonalData = async () => {
  const { data } = await $authHost.get("api/user/getPersonalData");
  return data;
};

export const setPersonalData = async (
  surname,
  name,
  patronymic,
  phone_number,
  passport_serial,
  passport_number,
  city,
  street,
  house_number
) => {
  const { data } = await $authHost.post("api/user/setPersonalData", {
    surname,
    name,
    patronymic,
    phone_number,
    passport_serial,
    passport_number,
    city,
    street,
    house_number,
  });
  return data;
};

export const checkProfile = async () => {
  const { data } = await $authHost.get("api/user/checkProfile");
  return data;
};

export const getConnectionTypes = async () => {
  const { data } = await $authHost.get("api/user/getConnectionTypes");
  return data;
};

export const getCompanies = async () => {
  const { data } = await $authHost.get("api/user/getCompanies");
  return data;
};

export const application = async (formData) => {
  const { data } = await $authHost.post("api/user/app", formData);
  return data;
};
