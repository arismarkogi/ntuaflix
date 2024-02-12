/*
import React from 'react';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Ntuaflix!</h1>
      <p>Explore the latest movies and TV shows.</p>
      {}
    </div>
  );
}


export default HomePage;*/

import React, { useState } from 'react';
import axios from 'axios';

const baseURL = 'https://localhost:9876/ntuaflix_api';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${baseURL}/searchname`, {
        params: {
          namePart: searchQuery
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
      // Handle errors here
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

