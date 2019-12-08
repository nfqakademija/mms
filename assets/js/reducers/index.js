import { users } from "./users.reducer";
import { admin } from "./admin.reducer";
import { combineReducers } from "redux";

export default combineReducers({
  users,
  admin
});
