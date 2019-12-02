import { memberships } from "./memberships.reducer";
import { users } from "./users.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  memberships,
  users
});
