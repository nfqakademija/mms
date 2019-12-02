import axios from "axios";

const api = () =>
  axios.create({
    baseURL: "http://192.168.99.100:8000/api" //process.env.REACT_APP_API
  });

export function setAuthorizationHeader(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export default api;
