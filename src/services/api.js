import axios from "axios";
const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:4000"
});
export const getData = (url) => {
  return api.get(url);
};
export const postData = (url, data) => {
  return api.post(url, data);
};
