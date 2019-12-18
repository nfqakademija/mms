import api from "../core/api";
export const authService = {
  login
};

async function login(Username, Password) {
  return await api()
    .post("/login_check", { username: Username, password: Password })
    .then(response => {
      const { status, data } = response;
      if (status == 200) {
        return data;
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
