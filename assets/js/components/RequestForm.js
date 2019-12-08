import React from "react";
import { useDispatch } from "react-redux";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  Container,
  Card,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  FormControl,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

export default function RequestForm() {
  const dispatch = useDispatch();

  function handleDelete() {
    alert("delete");
  }
  const [state, setState] = React.useState({
    checkbox: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <Container>
      <Typography variant="h4" style={{ marginBottom: "30px" }}>
        Paraiška įstoti
      </Typography>
      <Card style={{ padding: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="Vardas" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Pavarde" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField label="El. Paštas" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Telefono Nr." fullWidth />
          </Grid>
        </Grid>
      </Card>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid xs item={12}>
            <TextField label="Nuoroda i LinkedIN profilį" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="Nuoroda į portfolio" fullWidth />
          </Grid>
        </Grid>
      </Card>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6" style={{ marginBottom: "30px" }}>
          Įterpti papildomus faillus
        </Typography>
        <Grid container spacing={3}>
          <Chip
            icon={DescriptionIcon}
            label="text.txt"
            onDelete={handleDelete}
          />
          <Grid item xs={6}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Grid>
        </Grid>
      </Card>
      <Card style={{ padding: "20px", marginTop: "20px" }}>
        <Grid>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.checkbox}
                value="checkbox"
                onChange={handleChange("checkbox")}
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
        >
          Pateikti
        </Button>
      </Card>
    </Container>
  );
}
