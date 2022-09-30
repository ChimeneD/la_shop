import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Layout from "@components/layout";
import Login from "@components/login";
import TabPanel from "@components/tab-panel";
import Register from "@components/register";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

const Authentication = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Layout title="User Authentication">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="SIGN IN" {...a11yProps(0)} />
            <Tab label="SIGN UP" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Login />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </Box>
    </Layout>
  );
};

export default Authentication;
