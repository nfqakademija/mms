import React from "react";
import "@material-ui/core";
export default function LoginForm() {
  return (
    <div>
      <Grid item xs={6}>
        <Field
          fullWidth
          required
          name="firstName"
          component={TextField}
          type="text"
          label="First Name"
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          fullWidth
          required
          name="lastName"
          component={TextField}
          type="text"
          label="Last Name"
        />
      </Grid>
      <Grid item xs={12}>
        <Field
          name="email"
          fullWidth
          required
          component={TextField}
          type="email"
          label="Email"
        />
      </Grid>
    </div>
  );
}
