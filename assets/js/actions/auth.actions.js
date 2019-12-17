import { authConstants } from "../constants/auth.constants";
import { authService } from "../services/auth.service";
import { setAuthorizationHeader, removeAuthorizationHeader } from "../core/api";
export const adminActions = {
  login,
  logout
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

function logout() {
  removeAuthorizationHeader();

  localStorage.removeItem("token");
  return { type: "LOGOUT" };
}
