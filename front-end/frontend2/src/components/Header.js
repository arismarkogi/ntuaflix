import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Welcome to Ntuaflix</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;