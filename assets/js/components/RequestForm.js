import React from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../actions/user.actions";
import {
  Container,
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

export default function RequestForm() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [alertType, setAlertType] = React.useState("success");

  const [alert, setAlert] = React.useState("");

  const [state, setState] = React.useState({
    checkbox: false,
    name: "",
    surname: "",
    email: "",
    mobilePhone: "",
    linkedIn: "",
    url: "",
    enterText: ""
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };
  const handleCheckBox = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  const handleSubmit = () => {
    if (
      state.name &&
      state.surname &&
      /.+@.+\.[A-Za-z]+$/.test(state.email) &&
      state.mobilePhone
    ) {
      setAlertType("success");
      setOpen(true);
      setAlert("Užklausa nusiųsta. Apie patvirtinimą gausite El.Laišką");
      setState({
        checkbox: false,
        name: "",
        surname: "",
        email: "",
        mobilePhone: "",
        linkedIn: "",
        url: "",
        enterText: ""
      });
      dispatch(userActions.createRequest(state));
    } else {
      setAlertType("error");
      setOpen(true);
      setAlert("Neteisingai suvesti duomenys! (Email formatas svarbu!)");
    }
  };

  return (
    <Container>
      <Snackbar
        color="red"
        vertical="top"
        message={alert}
        variant={alertType}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
      />
      <Typography variant="h4" style={{ marginBottom: "30px" }}>
        Paraiška įstoti
      </Typography>
      <Card style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              inputProps={{ maxLength: 50 }}
              label="Vardas"
              value={state.name}
              onChange={handleChange("name")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputProps={{ maxLength: 50 }}
              value={state.surname}
              onChange={handleChange("surname")}
              label="Pavarde"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              inputProps={{ maxLength: 50 }}
              label="El. Paštas"
              value={state.email}
              onChange={handleChange("email")}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputProps={{ maxLength: 20 }}
              value={state.mobilePhone}
              onChange={handleChange("mobilePhone")}
              label="Telefono Nr."
              fullWidth
            />
          </Grid>
        </Grid>
      </Card>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid xs item={12}>
            <TextField
              inputProps={{ maxLength: 128 }}
              value={state.linkedIn}
              onChange={handleChange("linkedIn")}
              label="Nuoroda i LinkedIN profilį"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              inputProps={{ maxLength: 128 }}
              value={state.url}
              onChange={handleChange("url")}
              label="Nuoroda į portfolio"
              fullWidth
            />
          </Grid>
        </Grid>
      </Card>

      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Grid>
          <TextField
            variant="outlined"
            multiline
            label="Papildoma žinutė(128 simboliai)"
            value={state.enterText}
            onChange={handleChange("enterText")}
            fullWidth
            inputProps={{ maxLength: 128 }}
          />
        </Grid>
      </Card>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkbox}
                value="checkbox"
                onChange={handleCheckBox("checkbox")}
                color="primary"
              />
            }
            label="Sutinku, kad šita forma yra osum"
          />
        </Grid>

        <Button
          variant="contained"
          size="medium"
          color="primary"
          style={{ marginTop: "20px" }}
          onClick={() => handleSubmit()}
        >
          Pateikti
        </Button>
      </Card>
    </Container>
  );
}
