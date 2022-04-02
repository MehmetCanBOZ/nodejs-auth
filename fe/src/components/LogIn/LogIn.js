import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AuthServices from "services/auth.service";
const LogIn = ({ setIsAuthenticated }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = async () => {
    const response = await AuthServices.login({ email, password });

    if (response) {
      setIsAuthenticated(true);
      return;
    }

    alert("Kulanıcı veya şifre Hatalı");
  };
  return (
    <div>
      <h1>Login Page</h1>
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
          label="Email"
          type="email"
          variant="outlined"
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
        <Button variant="outlined" onClick={loginUser}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default LogIn;
