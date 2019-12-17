import { userConstants } from "../constants/user.constants";
import { userService } from "../services/user.service";
export const userActions = {
  create,
  getAll,
  getById,
  delete: _delete,
  update,
  addComment,
  deleteComment,
  getRequests,
  removeRequest,
  createRequest
};
function addComment(comment) {
  return dispatch => {
    dispatch(request(comment));

    userService.addComment(comment).then(
      newComment => dispatch(success(newComment)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(comment) {
    return { type: userConstants.COMMENT_ADD_REQUEST, comment };
  }
  function success(comment) {
    return { type: userConstants.COMMENT_ADD_SUCCESS, comment };
  }
  function failure(error) {
    return { type: userConstants.COMMENT_ADD_FAILURE, error };
  }
}
function deleteComment(comment) {
  return dispatch => {
    dispatch(request(comment));

    userService.deleteComment(comment).then(
      comment => dispatch(success(comment)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(comment) {
    return { type: userConstants.COMMENT_DELETE_REQUEST, comment };
  }
  function success(comment) {
    return { type: userConstants.COMMENT_DELETE_SUCCESS, comment };
  }
  function failure(error) {
    return { type: userConstants.COMMENT_DELETE_FAILURE, error };
  }
}
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
function createRequest(user) {
  return dispatch => {
    dispatch(request(user));

    userService.createRequest(user).then(
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
function update(user) {
  return dispatch => {
    dispatch(request(user));

    userService.update(user).then(
      user => dispatch(success(user)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.UPDATE_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.UPDATE_FAILURE, error };
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
function getRequests() {
  return dispatch => {
    dispatch(request());

    userService.getRequests().then(
      requests => dispatch(success(requests)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: userConstants.REQUESTS_GETALL_REQUEST };
  }
  function success(requests) {
    return { type: userConstants.REQUESTS_GETALL_SUCCESS, requests };
  }
  function failure(error) {
    return { type: userConstants.REQUESTS_GETALL_FAILURE, error };
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

    userService._delete(id).then(
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

function removeRequest(id) {
  return { type: userConstants.REMOVE_REQUEST, id };
}
