import api from "../core/api";
import { ROUTES } from "../constants/api.constants";
export const membershipService = {
  getAll,
  create,
  delete: _delete
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
      console.log(response);
      if (status == 200) {
        return data;
      }
    })
    .catch(error => {
      return Promise.reject(error);
    });
}

async function create(membership) {
  const userId = membership.userId;
  const status = membership.status;
  const expiredAt = membership.expiredAt;

  return await api()
    .post(ROUTES.MEMBERSHIPS, null, {
      params: {
        expiredAt,
        status,
        userId
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
