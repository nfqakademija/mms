import React from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../actions/user.actions";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

//TODO Loading and alert banners//

export default function UsersTable() {
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();

  const columns = [
    { title: "Vardas", field: "name" },
    { title: "Pavarde", field: "surname" },
    { title: "El. Pastas", field: "email" },
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
      data={users.items}
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
            const name = newData.name;
            const surname = newData.surname;
            const email = newData.email;
            const status = newData.status;
            const expiredAt = newData.expiredAt;

            dispatch(
              userActions.create({
                name,
                surname,
                email,
                status,
                approve,
                expiredAt
              })
            );
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const name = newData.name;
            const surname = newData.surname;
            const email = newData.email;
            const status = newData.status;
            const expiredAt = newData.expiredAt;
            const id = oldData.id;
            dispatch(
              userActions.update({
                id,
                name,
                surname,
                email,
                status,
                approve,
                expiredAt
              })
            );
            resolve();
          }),

        onRowDelete: oldData =>
          new Promise(resolve => {
            dispatch(userActions.delete(oldData.id));
            resolve();
          })
      }}
    />
  );
}
