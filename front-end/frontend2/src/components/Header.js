/*import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'green' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Ntuaflix!
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MySearchBar from './SearchBar'; // Εισαγωγή του SearchBar component

const Header = ({ handleSearch, loading, searchQuery, setSearchQuery }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Ntuaflix!
        </Typography>       
      </Toolbar>
    </AppBar>
  );
};

export default Header;*/

import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Home as HomeIcon, ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
//import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton sx={{ color: "white" }}>
            <HomeIcon />
          </IconButton>
        <Typography variant="h6">Ntuaflix</Typography>
          <IconButton sx={{ color: "white" }}>
            <ShoppingCartIcon />
          </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;