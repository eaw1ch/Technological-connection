import { $host } from "./axios";

export const getInfo = async () => {
  const { data } = await $host.get("api/user/getInfo");
  return data;
};

export const getCountApp = async () => {
  const { data } = await $host.get("api/user/getCountApp");
  return data;
};

export const getSubmittedApp = async () => {
  const { data } = await $host.get("api/user/getSubmittedApp");
  return data;
};

export const sendFeedback = async (email, question) => {
  const { data } = await $host.post("api/user/getFeedback", {
    email,
    question,
  });
  return data;
};
