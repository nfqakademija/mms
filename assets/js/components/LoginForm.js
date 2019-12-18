import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../actions/auth.actions";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(5)
  }
}));

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  function login() {
    dispatch(authActions.login(userName, password));
  }

  return (
    <div className="center">
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              required
              id="username"
              label="Vartotojo vardas"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <TextField
              required
              type="password"
              id="password"
              label="Slaptažodis"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Grid>
          <Button
            className={classes.margin}
            onClick={() => {
              login();
            }}
            variant="outlined"
            color="primary"
          >
            Prisijungti
          </Button>
        </Grid>
      </div>
    </div>
  );
}
