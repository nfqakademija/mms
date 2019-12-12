import React from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { membershipActions } from "../actions/membership.actions";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

//TODO Loading and alert banners//

export default function MembershipsTable() {
  const memberships = useSelector(state => state.memberships);

  const dispatch = useDispatch();

  const columns = [
    { title: "Vardas", field: "user.name" },
    { title: "Pavarde", field: "user.surname" },
    { title: "El. Pastas", field: "user.email" },
    { title: "Telefono Nr.", field: "user.mobilePhone" },
    { title: "Statusas", field: "status" },
    { title: "Galioja iki", field: "expiredAt", type: "date" }
  ];
  const approve = 1;

  return (
    <MaterialTable
      options={{
        paging: false
      }}
      title="Vartotojai"
      columns={columns}
      data={memberships.items}
      detailPanel={[
        {
          icon: "comment-edit",

          tooltip: "Show comments",
          render: rowData => {
            return (
              <div
                style={{
                  textAlign: "center",
                  color: "black"
                }}
              >
                <div>
                  <p>Komentaras1</p>
                </div>
                <div>
                  <p>Komentaras2</p>
                </div>
                <IconButton onClick={() => alert("TODO: add comment ")}>
                  <AddIcon />
                </IconButton>
              </div>
            );
          }
        }
      ]}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            const name = newData.user.name;
            const surname = newData.user.surname;
            const email = newData.user.email;
            const mobilePhone = newData.user.mobilePhone;
            const status = newData.status;
            const expiredAt = newData.expiredAt;

            dispatch(
              membershipActions.create({
                name,
                surname,
                email,
                mobilePhone,
                status,
                expiredAt
              })
            );
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const name = newData.user.name;
            const surname = newData.user.surname;
            const email = newData.user.email;
            const mobilePhone = newData.user.mobilePhone;
            const status = newData.status;
            const expiredAt = newData.expiredAt;
            const id = oldData.id;
            dispatch(
              membershipActions.update({
                id,
                name,
                surname,
                email,
                status,
                mobilePhone,
                expiredAt
              })
            );
            resolve();
          }),

        onRowDelete: oldData =>
          new Promise(resolve => {
            dispatch(membershipActions.delete(oldData.id));
            resolve();
          })
      }}
    />
  );
}
