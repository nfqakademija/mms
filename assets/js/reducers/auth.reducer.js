import { authConstants } from "../constants/auth.constants";
export function auth(state = { loggedIn: false, token: "" }, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };

    case authConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: action.token
      };
    case authConstants.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
        loggedIn: false
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        token: "",
        loggedIn: false
      };
    default:
      return state;
  }
}
