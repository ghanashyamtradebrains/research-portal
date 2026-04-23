import axios from "axios";
const instance = axios.create({
  baseURL: process.env.NEXT_APP_BASE_URL,
});

export const withoutAuthPost = (url, data) => {
  return instance.post(url, data);
};
export const withoutAuthGet = (url) => {
  return instance.get(url);
};
export const withoutAuthDel = (url, data) => {
  return instance.delete(url);
};
export const withoutAuthPut = (url, data) => {
  return instance.put(url, data);
};
export const withoutAuthPatch = (url, data) => {
  return instance.patch(url, data);
};
