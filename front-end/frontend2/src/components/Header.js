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
*/
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MySearchBar from './SearchBar'; // Εισαγωγή του SearchBar component

const Header = ({ handleSearch, loading, searchQuery, setSearchQuery }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'green' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Ntuaflix!
        </Typography>
        {/* Ενσωμάτωση του SearchBar component */}
        <MySearchBar handleSearch={handleSearch} loading={loading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
