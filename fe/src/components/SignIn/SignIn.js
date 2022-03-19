import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignIn = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const onSubmit = () => {};
  return (
    <div>
      <h1>SignIn Page</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="LastName"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="outlined" onClick={onSubmit}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
