import api from "../core/api";
import { ROUTES } from "../constants/api.constants";

export const userService = {
  create,
  getAll,
  update,
  _delete
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
async function _delete(id) {
  return await api()
    .delete(ROUTES.USERS + `/${id}`)
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
  const status = user.status;
  const expiredAt = user.expiredAt;
  return await api()
    .put(ROUTES.USERS, null, {
      params: {
        name,
        surname,
        email,
        approve,
        status,
        expiredAt
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
async function update(user) {
  const id = user.id;
  const name = user.name;
  const surname = user.surname;
  const email = user.email;
  const approve = user.approve;
  const status = user.status;
  const expiredAt = user.expiredAt;
  return await api()
    .patch(ROUTES.USERS, null, {
      params: {
        id,
        name,
        surname,
        email,
        approve,
        status,
        expiredAt
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
