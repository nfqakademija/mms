import api from "../core/api";
import { ROUTES } from "../constants/api.constants";
import moment from "moment";

export const userService = {
  create,
  getAll,
  update,
  _delete,
  addComment,
  deleteComment,
  getRequests,
  createRequest,
  exportUsers
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
async function getRequests() {
  return await api()
    .get(ROUTES.USERS + "?approved=0")
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
async function addComment(comment) {
  userId = comment.userId;
  text = comment.text;
  return await api()
    .put(ROUTES.USERS + `/${userId}` + ROUTES.COMMENTS, null, {
      params: {
        text
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
async function deleteComment(comment) {
  commentId = comment.id;
  userId = comment.userId;
  return await api()
    .delete(ROUTES.USERS + `/${userId}` + ROUTES.COMMENTS + `/${id}`)
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
  const mobilePhone = user.mobilePhone;
  const approve = user.approve;
  const enterText = user.enterText;
  const url = user.url;
  const linkedIn = user.linkedIn;

  return await api()
    .put(ROUTES.USERS, null, {
      params: {
        name,
        surname,
        email,
        approve,
        mobilePhone,
        enterText,
        url,
        linkedIn
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
async function createRequest(user) {
  const name = user.name;
  const surname = user.surname;
  const email = user.email;
  const mobilePhone = user.mobilePhone;
  const entryText = user.enterText;
  const url = user.url;
  const linkedIn = user.linkedIn;

  return await api()
    .post(ROUTES.REQUEST, null, {
      params: {
        name,
        surname,
        email,
        mobilePhone,
        entryText,
        url,
        linkedIn
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
async function exportUsers() {
  const FileDownload = require("js-file-download");

  return await api()
    .get("/export/users")
    .then(response => {
      FileDownload(
        response.data,
        `Users_Exported_At:${moment().format("YYYY-MM-DD.HH:mm:ss")}.csv`
      );
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
