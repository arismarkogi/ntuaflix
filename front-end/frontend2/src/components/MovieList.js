// MovieList.js
import React from 'react';
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
