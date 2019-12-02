import api from "../core/api";
import { ROUTES } from "../constants/api.constants";

export const userService = {
  create,
  getAll
};
async function getAll() {
  return await api()
    .get(ROUTES.USERS)
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
async function create(user) {
  const name = user.name;
  const surname = user.surname;
  const email = user.email;
  const approve = user.approve;
  return await api()
    .put(ROUTES.USERS, null, {
      params: {
        name,
        surname,
        email,
        approve
      }
    })
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
