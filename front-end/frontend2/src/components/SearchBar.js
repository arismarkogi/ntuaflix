// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ handleSearch, loading, searchQuery, setSearchQuery }) => {
  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={handleSearch} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
    </div>
  );
};

export default SearchBar;
