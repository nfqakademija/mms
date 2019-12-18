import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../actions/user.actions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function NewComment() {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddComment = () => {
    if (comment) {
      useDispatch(userActions.addComment(comment));
    }
  };
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Pridėti
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Pridėti Komentarą</DialogTitle>
        <DialogContent>
          <DialogContentText>Iveskite Naują Komentarą</DialogContentText>
          <TextField
            autoFocus
            value={comment}
            onChange={() => setComment(target.value)}
            margin="dense"
            id="name"
            label="Komentaras"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Atšaukti
          </Button>
          <Button onClick={handleAddComment} color="primary">
            Pridėti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
