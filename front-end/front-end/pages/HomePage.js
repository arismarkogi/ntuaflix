import React, { useState } from 'react';

const HomePage = () => {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Εδώ μπορείτε να υλοποιήσετε τη λειτουργικότητα αναζήτησης και επικοινωνίας με τον server
    console.log('Search Text:', searchText);
    console.log('Filter:', filter);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="movies">Movies</option>
          <option value="series">Series</option>
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default HomePage;
