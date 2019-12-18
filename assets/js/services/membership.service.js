import api from "../core/api";
import { ROUTES } from "../constants/api.constants";
import moment from "moment";
export const membershipService = {
  getAll,
  create,
  _delete,
  update,
  assign
};

async function getAll() {
  return await api()
    .get(ROUTES.MEMBERSHIPS)
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
    .delete(ROUTES.MEMBERSHIPS + "/" + id.toString())
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

async function assign(userId) {
  const expiredAt = moment().format("YYYY-MM-DD");

  return await api()
    .post(ROUTES.MEMBERSHIPS, null, {
      params: {
        userId,
        expiredAt
      }
    })
    .then(response => {
      const { status, data } = response;
      if (status == 201) {
        return data;
      } else {
        return Promise.reject(error);
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
async function create(membership) {
  const name = membership.name;
  const surname = membership.surname;
  const email = membership.email;
  const mobilePhone = membership.mobilePhone;
  const status = membership.status;
  const expiredAt = membership.expiredAt;

  return await api()
    .post(ROUTES.MEMBERSHIPS, null, {
      params: {
        name,
        surname,
        email,
        mobilePhone,
        expiredAt,
        status
      }
    })
    .then(response => {
      const { status, data } = response;
      if (status == 201) {
        return data;
      } else {
        return Promise.reject(error);
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
async function update(membership) {
  const id = membership.id;
  const name = membership.name;
  const surname = membership.surname;
  const email = membership.email;
  const mobilePhone = membership.mobilePhone;
  const status = membership.status;
  const expiredAt = membership.expiredAt;
  return await api()
    .put(ROUTES.MEMBERSHIPS + `/${id}`, null, {
      params: {
        id,
        name,
        surname,
        email,
        status,
        expiredAt,
        mobilePhone
      }
    })
    .then(response => {
      const { status, data } = response;
      if (status == 200 || 201) {
        return data;
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
