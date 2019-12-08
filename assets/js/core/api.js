import axios from "axios";

const api = () =>
  axios.create({
    baseURL: process.env.REACT_APP_API
  });

export function setAuthorizationHeader(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export default api;
