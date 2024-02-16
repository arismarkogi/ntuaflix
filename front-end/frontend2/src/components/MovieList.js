// MovieList.js
/*import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h5">{movie.title}</Typography>
            <Typography variant="body2">{movie.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MovieList;
*/

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import MySearchBar from './SearchBar';

const MovieList = ({ handleSearch, loading, searchQuery, setSearchQuery }) => {
  return (
    <div>
      <MySearchBar handleSearch={handleSearch} loading={loading} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
};

export default MovieList;