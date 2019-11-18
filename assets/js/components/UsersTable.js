import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import API from "../core/api";
export default class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    axios.get(`http://192.168.99.100:8000/api/users`).then(res => {
      const users = res.data;
      this.setState({ users });
    });
  }
  render() {
    const columns = [
      { title: "Vardas", field: "name" },
      { title: "Pavarde", field: "surname" },
      { title: "El. Pastas", field: "email" }
    ];
    const approve = 0;

    return (
      <MaterialTable
        options={{
          paging: false
        }}
        title="Vartotojai"
        columns={columns}
        data={this.state.users}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              const name = newData.name;
              const surname = newData.surname;
              const email = newData.email;

              API.put(`/users`, null, {
                params: {
                  name,
                  surname,
                  email,
                  approve
                }
              }).then(res => {
                if (res.status == 200) {
                  const users = this.state.users;
                  users.push(res.data);
                  this.setState({ users }, () => resolve());
                }
              });
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              const name = newData.name;
              const surname = newData.surname;
              const email = newData.email;
              const id = oldData.id;
              API.patch(`users`, null, {
                params: {
                  name,
                  surname,
                  email,
                  id
                }
              }).then(res => {
                if (res.status == 200) {
                  let users = [...this.state.users];
                  users[users.indexOf(oldData)] = newData;
                  this.setState({ users }, () => resolve());
                }
              });

              resolve();
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              const id = oldData.id;

              API.delete(`users/${id}`).then(res => {
                if (res.status == 200) {
                  let users = [...this.state.users];
                  users.splice(users.indexOf(oldData), 1);
                  this.setState({ users }, () => resolve());
                }
              });

              resolve();
            })
        }}
      />
    );
  }
}
