import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";

export const userActions = {
  create,
  getAll,
  getById,
  delete: _delete
};
function create(user) {
  return dispatch => {
    dispatch(request(user));

    userService.create(user).then(
      newUser => dispatch(success(newUser)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(user) {
    return { type: userConstants.CREATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.CREATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.CREATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    userService.getAll().then(
      users => dispatch(success(users)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.GETALL_REQUEST };
  }
  function success(users) {
    return { type: userConstants.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: userConstants.GETALL_FAILURE, error };
  }
}
function getById(id) {
  return dispatch => {
    dispatch(request(id));

    userService.getById(id).then(
      user => dispatch(success(user)),
      error => dispatch(failure(id, error.toString()))
    );
  };
  function request(id) {
    return { type: userConstants.GETBYID_REQUEST, id };
  }
  function success(user) {
    return { type: userConstants.GETBYID_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.GETBYID_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    userService.delete(id).then(
      user => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
