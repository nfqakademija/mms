import { authConstants } from "../constants/auth.constants";
import { authService } from "../services/auth.service";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../core/api";
export const authActions = {
  login,
  logout,
  reauthenticate
};

function login(username, password) {
  return dispatch => {
    dispatch(request());

    authService.login(username, password).then(
      response => dispatch(success(response)),
      error => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: authConstants.LOGIN_REQUEST };
  }
  function success(response) {
    let token = response.token;
    let refresh_token = response.refresh_token;
    setAuthorizationHeader(token);
    localStorage.setItem("token", token);

    return { type: authConstants.LOGIN_SUCCESS, token };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
}
function reauthenticate() {
  console.log(localStorage.getItem("token"));
  if (localStorage.getItem("token") === null) {
    return { type: authConstants.REAUTHENTICATE_FAILURE };
  } else {
    const token = localStorage.getItem("token");
    setAuthorizationHeader(token);
    return { type: authConstants.REAUTHENTICATE_SUCCESS, token };
  }
}
function logout() {
  removeAuthorizationHeader();
  localStorage.removeItem("token");
  return { type: "LOGOUT" };
}
