import { users } from "./user.reducer";
import { memberships } from "./membership.reducer";

import { admin } from "./admin.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  users,
  admin,
  memberships
});
