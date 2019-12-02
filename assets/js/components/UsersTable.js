import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { membershipActions } from "../actions/membership.actions";
import { userActions } from "../actions/user.actions";
//TODO Loading and alert banners//

export default function UsersTable() {
  const memberships = useSelector(state => state.memberships);
  const users = useSelector(state => state.users);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(membershipActions.getAll());
    dispatch(userActions.getAll());
  }, []);

  const columns = [
    { title: "Vardas", field: "user.name" },
    { title: "Pavarde", field: "user.surname" },
    { title: "El. Pastas", field: "user.email" },
    { title: "Statusas", field: "status" },
    { title: "Galioja iki", field: "expiredAt", type: "date" }
  ];
  const approve = 0;

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
            const status = newData.status;
            const expiredAt = newData.expiredAt;

            dispatch(
              userActions.createWithMembership(
                { name, surname, email, approve },
                { status, expiredAt }
              )
            );
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            const name = newData.user.name;
            const surname = newData.user.surname;
            const email = newData.user.email;
            const status = newData.status;
            const expiredAt = newData.expiredAt;
            const id = oldData.user.id;
            API.patch(`/users`, null, {
              params: {
                name,
                surname,
                email,
                id
              }
            });
            //  if (res.status == 200 || 500) {
            //TODO: FU**ED BACKEND 500 but works... how?
            API.put(`/memberships/${newData.id}`, null, {
              params: {
                expiredAt,
                status,
                id
              }
            }).then(res2 => {
              if (res2.status == 200 || 201) {
                //TODO: 201? on update? why? PUT? why? I am not creating new object
                console.log(res2);
                let users = [...this.state.users];
                users[users.indexOf(oldData)] = newData;
                this.setState({ users }, () => resolve());
              }
            });
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            console.log(oldData);
            dispatch(membershipActions.delete(oldData.id));
            resolve();
          })
      }}
    />
  );
}
