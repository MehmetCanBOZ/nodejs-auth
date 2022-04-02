import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Avatar from "@mui/material/Avatar";
import TabPanel from "@mui/lab/TabPanel";
import LogIn from "components/LogIn/LogIn";
import SignIn from "components/SignIn/SignIn";
import useAuth from "hooks/useAuth";
import UserService from "services/user.service";
function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [value, setValue] = React.useState("2");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1>
            Welcome {UserService.userName() ? UserService.userName() : null}
          </h1>
          <Box
            mt={2}
            mb={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="Ronaldo"
              src="https://img.a.transfermarkt.technology/portrait/big/8198-1631656078.jpg?lm=1"
              sx={{ width: 100, height: 100 }}
            />
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="SignIn" value="1" />
                <Tab label="Login" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <SignIn changeTab={handleChange} />
            </TabPanel>
            <TabPanel value="2">
              <LogIn setIsAuthenticated={setIsAuthenticated} />
            </TabPanel>
          </TabContext>
        </Box>
      )}
    </div>
  );
}

export default App;
