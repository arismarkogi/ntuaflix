/*
import React, { useState } from 'react';
import axios from 'axios';
//import './SearchBar.css';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';



const baseURL = 'https://localhost:9876/ntuaflix_api';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/searchname/${searchQuery}`);
      // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    }
    finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="center">
      <h1>Search</h1>
      <SearchBar
        handleSearch={handleSearch}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {loading && <p>Loading...</p>}
      {searchResults.length > 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Όνομα</TableCell>
                <TableCell align="center">Επίθετο</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((result, index) => {
                const [name, surname] = result.name.split(' ');
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{surname}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchBar;

*/


import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Button, TextField } from '@mui/material';
import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';

const baseURL = 'https://localhost:9876/ntuaflix_api';

const SearchBar = () => { // Αλλάξαμε το όνομα από MySearchBar σε SearchBar
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseURL}/searchname/${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center">
      <h1>Search</h1>
      <TextField 
        label="Search Query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ height: '55px', color: 'white', backgroundColor: 'grey' }}
        className="searchField" // Προσθέστε την κλάση CSS για το πεδίο αναζήτησης
      />
      <Button 
        variant="contained" 
        onClick={handleSearch} 
        startIcon={<SearchIcon />}
        sx={{ height: '55px', color: 'white', backgroundColor: 'grey' }}
        className="searchButton" // Προσθέστε την κλάση CSS για το κουμπί αναζήτησης
        style={{ marginRight: '10px' }}
      >
        Search
      </Button>
      {loading && <p>Loading...</p>}
      <div className="searchResultsContainer"> {/* Προσθέστε την κλάση CSS για τον κύριο δοχείο αποτελεσμάτων αναζήτησης */}
        {searchResults.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Όνομα</TableCell>
                  <TableCell align="center">Επίθετο</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((result, index) => {
                  const [name, surname] = result.name.split(' ');
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{name}</TableCell>
                      <TableCell align="center">{surname}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
  /*return (
    <div className="center">
      <h1>Search</h1>
      <TextField 
        label="Search Query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button> 
      {loading && <p>Loading...</p>}
      {searchResults.length > 0 ? (
        <TableContainer component={Paper} style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Όνομα</TableCell>
                <TableCell align="center">Επίθετο</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((result, index) => {
                const [name, surname] = result.name.split(' ');
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{surname}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );*/
};

export default SearchBar;
