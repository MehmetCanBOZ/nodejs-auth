import "./App.css";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LogIn from "./components/LogIn/LogIn";
import SignIn from "./components/SignIn/SignIn";

function App() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="SignIn" value="1" />
              <Tab label="Login" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignIn />
          </TabPanel>
          <TabPanel value="2">
            <LogIn />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default App;
