import React from "react";
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
  const classes = useStyles();

  return (
    <div className="center">
      <div>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="username" label="Vartotojo vardas" />
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <TextField type="password" id="password" label="Slaptažodis" />
          </Grid>
          <Button className={classes.margin} variant="outlined" color="primary">
            Prisijungti
          </Button>
        </Grid>
      </div>
    </div>
  );
}
