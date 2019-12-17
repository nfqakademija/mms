import React from "react";
import MaterialTable from "material-table";
import API from "../core/api";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { membershipActions } from "../actions/membership.actions";
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";
//TODO Loading and alert banners//

export default function MembershipsTable() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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

  return (
    <div>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Pridėti komentarą</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Komentaras:</DialogContentText> */}
          <TextField
            id="standard-multiline-flexible"
            label="Komentaras:"
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Atšaukti
          </Button>
          <Button onClick={handleClose} color="primary">
            Pridėti
          </Button>
        </DialogActions>
      </Dialog>
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
                <div>
                  <List>
                    {rowData.user.comments.map(com => (
                      <div key={com.id}>
                        <ListItem alignItems="center">
                          <Typography variant="body1" align="center">
                            {com.text}
                          </Typography>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    ))}
                    <ListItem align="center">
                      <IconButton onClick={handleOpen}>
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                  </List>
                  {console.log(rowData.user.comments)}
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
    </div>
  );
}
