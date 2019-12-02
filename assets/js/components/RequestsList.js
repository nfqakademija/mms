import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { membershipActions } from "../actions/membership.actions";
import { userActions } from "../actions/user.actions";

export default function RequestsList() {
  const memberships = useSelector(state => state.memberships.items);
  let users = [];
  users = useSelector(state => state.users.items);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(membershipActions.getAll());
    dispatch(userActions.getAll());
  }, []);

  return (
    <div>
      <ul>
        {memberships ? (
          memberships.map(user => (
            <li>
              <p> {user.user.name}</p>
              <p> {user.user.surname}</p>
              <button>Prideti</button>
              <button>Atmesti</button>
            </li>
          ))
        ) : (
          <p>Naujų užklausų nėra</p>
        )}
      </ul>
    </div>
  );
}
