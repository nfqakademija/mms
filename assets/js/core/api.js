import axios from "axios";

const api = () =>
  axios.create({
    baseURL: `https://mms.projektai.nfqakademija.lt/api` //TODO: env URL
  });

export function setAuthorizationHeader(token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
  delete axios.defaults.headers.common["Authorization"];
}

export default api;
