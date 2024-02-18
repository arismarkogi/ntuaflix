import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, TextField } from '@mui/material';
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';

const baseURL = 'https://localhost:9876/ntuaflix_api';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);


  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/searchname/${searchQuery}`);
      setSearchResults(response.data);
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleClearResults = () => {
    setSearchResults([]); // Clear search results
    setSearchPerformed(false); // Reset searchPerformed state
    setSearchQuery('');
  };

  return (
    <div className="center">
      <h1>Search</h1>
      <TextField 
        label="Search by namePart"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputLabelProps={{
          sx: { color: 'white','&.Mui-focused': { color: 'white' } }, // Style for the label
        }}
        InputProps={{
          sx: { color: 'white', '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Set border color on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white', // Set border color when focused
          },}, // Set text color to white
          inputProps: { style: { color: 'white' } }, // Set text color to white for the input element
        }}
        sx={{ height: '55px', color: 'white', backgroundColor: 'black' }}
        className="searchField" // Προσθέστε την κλάση CSS για το πεδίο αναζήτησης
      />
      <Button 
        variant="contained" 
        onClick={handleSearch} 
        startIcon={<SearchIcon />}
        disabled={!searchQuery} // Disable the button if searchQuery is empty
        sx={{ height: '55px', color: 'white', backgroundColor: 'black','&:hover': { bgcolor: 'darkgreen',}, }}
        className="searchButton"
        style={{ marginRight: '10px' }}
      >
        Search
      </Button>
      <Button
        variant="contained"
        onClick={handleClearResults}
        sx={{ height: '55px', color: 'white', backgroundColor: 'black', '&:hover': { bgcolor: 'darkred', } }}
      >
      Clear Results
      </Button>
      {loading && <p>Loading...</p>}
      <div className="searchResultsContainer"> {/* Προσθέστε την κλάση CSS για τον κύριο δοχείο αποτελεσμάτων αναζήτησης */}
      {searchPerformed && searchResults.length === 0 && <p>No results found</p>}
        {searchResults.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Όνομα</TableCell>
                  <TableCell align="center">Επίθετο</TableCell>
                  <TableCell align="center">Έτος Γέννησης</TableCell>
                  <TableCell align="center">Επάγγελμα</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => {
                  //const [name, surname] = result.name.split(' ');<TableCell align="center">{name}</TableCell><TableCell align="center">{surname}</TableCell>
                  const { name, birthYr, profession} = result;
                  const [firstName, ...lastName] = name.split(' ');
                  const fullName = lastName.join(' ');
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{firstName}</TableCell>
                      <TableCell align="center">{fullName}</TableCell>
                      <TableCell align="center">{birthYr}</TableCell>
                      <TableCell align="center">{profession}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
