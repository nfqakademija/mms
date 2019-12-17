import { users } from "./user.reducer";
import { memberships } from "./membership.reducer";
import { auth } from "./auth.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  users,
  auth,
  memberships
});
