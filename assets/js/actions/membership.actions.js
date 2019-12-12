import { membershipConstants } from "../constants/membership.constants";
import { membershipService } from "../services/membership.service";
export const membershipActions = {
  create,
  getAll,
  getById,
  delete: _delete,
  update
};
function create(membership) {
  return dispatch => {
    dispatch(request(membership));

    membershipService.create(membership).then(
      newUser => dispatch(success(newUser)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(membership) {
    return { type: membershipConstants.CREATE_REQUEST, membership };
  }
  function success(membership) {
    return { type: membershipConstants.CREATE_SUCCESS, membership };
  }
  function failure(error) {
    return { type: membershipConstants.CREATE_FAILURE, error };
  }
}
function update(membership) {
  return dispatch => {
    dispatch(request(membership));

    membershipService.update(membership).then(
      membership => dispatch(success(membership)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request(membership) {
    return { type: membershipConstants.UPDATE_REQUEST, membership };
  }
  function success(membership) {
    console.log(membership);
    return { type: membershipConstants.UPDATE_SUCCESS, membership };
  }
  function failure(error) {
    return { type: membershipConstants.UPDATE_FAILURE, error };
  }
}

function getAll() {
  return dispatch => {
    dispatch(request());

    membershipService.getAll().then(
      memberships => dispatch(success(memberships)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: membershipConstants.GETALL_REQUEST };
  }
  function success(memberships) {
    return { type: membershipConstants.GETALL_SUCCESS, memberships };
  }
  function failure(error) {
    return { type: membershipConstants.GETALL_FAILURE, error };
  }
}
function getById(id) {
  return dispatch => {
    dispatch(request(id));

    membershipService.getById(id).then(
      membership => dispatch(success(membership)),
      error => dispatch(failure(id, error.toString()))
    );
  };
  function request(id) {
    return { type: membershipConstants.GETBYID_REQUEST, id };
  }
  function success(membership) {
    return { type: membershipConstants.GETBYID_SUCCESS, membership };
  }
  function failure(error) {
    return { type: membershipConstants.GETBYID_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    membershipService._delete(id).then(
      membership => dispatch(success(id)),
      error => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: membershipConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: membershipConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: membershipConstants.DELETE_FAILURE, id, error };
  }
}
