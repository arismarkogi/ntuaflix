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

/*
import React from 'react';

const NavigationMenu = () => {
  return (
    <div>
      <h1>Hello from nav</h1>
    </div>
  );
};

export default NavigationMenu;
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'https://localhost:9876/ntuaflix_api';


const NavigationMenu = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const titlePart = '';
                const response = await axios.get(`${baseURL}/searchttitle?titlePart=${titlePart}`);
                //const response = await axios.get(`${baseURL}/searchttitle/${titlePart}`);
                //const response = await axios.get(`${baseURL}/searchttitle`);
                console.log(response);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();


        const interval = setInterval(fetchMovies, 1 * 60 * 1000);

        // Cleanup function to clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex === movies.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? movies.length - 1 : prevIndex - 1));
    };

    return (
        <div>
            <h2>Navigation Menu</h2>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            {movies.length > 0 && (
                <div>
                    <img src={movies[currentIndex].titlePoster} alt={movies[currentIndex].originalTitle} />
                    <p>{movies[currentIndex].originalTitle}</p>
                    {/* Εδώ μπορείτε να προσθέσετε άλλες πληροφορίες για την ταινία */}
                </div>
            )}
        </div>
    );
};

export default NavigationMenu;
