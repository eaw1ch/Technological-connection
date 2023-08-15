import { $authHost } from "./axios";

export const showAll = async () => {
  const { data } = await $authHost.get("api/admin/showUsers");
  return data;
};

export const getAllApp = async () => {
  const { data } = await $authHost.get("api/admin/getAllApp");
  return data;
};

export const setAdmin = async (email) => {
  const { data } = await $authHost.post("api/admin/setAdmin", email);
  return data;
};

export const addCompany = async ({
  name,
  index,
  city,
  street,
  house_number,
  email,
  phone_number,
  cite,
}) => {
  const { data } = await $authHost.post("api/admin/addCompany", {
    name,
    index,
    city,
    street,
    house_number,
    email,
    phone_number,
    cite,
  });
  return data;
};

export const getInfoApplication = async ({
  user_id,
  type_id,
  company_id,
  device_id,
  info_id,
}) => {
  const { data } = await $authHost.post("api/admin/getInfoApplication", {
    user_id,
    type_id,
    company_id,
    device_id,
    info_id,
  });
  return data;
};

export const submittingApp = async (app_id) => {
  const { data } = await $authHost.post("api/admin/submittingApp", app_id);
  return data;
};

// export const rejectingApp = async (app_id) => {
//   const { data } = await $authHost.post("api/admin/rejectingApp", app_id);
//   return data;
// };
