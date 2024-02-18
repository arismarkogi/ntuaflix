import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import './MovieList.css'

const baseURL = 'https://localhost:9876/ntuaflix_api';


const InfoContainer = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Poster = styled('img')({
  maxWidth: '200px',
  height: 'auto',
});

const ButtonContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});


const NavigationMenu = () => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const titlePart = '';
                const response = await axios.get(`${baseURL}/searchttitle?titlePart=${titlePart}`);
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

    //const modifiedTitlePoster = movies[currentIndex].titlePoster.replace('{width_variable}', 'w500');
    /*return (
      <div>
          <h2>Navigation Menu</h2>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
          {movies.length > 0 && (
              <div className="img-container">
                {movies[currentIndex].titlePoster && (
                    <img src={movies[currentIndex].titlePoster.replace('{width_variable}', 'w500')} alt={movies[currentIndex].originalTitle} />
                )}
                  <p>{movies[currentIndex].originalTitle}</p>
                  <p>Genres: {movies[currentIndex].genres.map(genre => genre.genreTitle).join(', ')}</p>
                  <p>Start Year: {movies[currentIndex].startYear}</p>
                  <p>End Year: {movies[currentIndex].endYear || 'N/A'}</p>
                  <p>Rating: {movies[currentIndex].rating.avRating}</p>
              </div>
          )}
      </div>
  );*/
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontSize: '28px', fontWeight: 'bold', color: 'black', textTransform: 'uppercase', margin: '20px 0' }}>Navigate to the best movies of all time</h2>
      {movies.length > 0 && (
        <InfoContainer elevation={3}>
          <ButtonContainer>
          <Button variant="contained" onClick={handlePrevious} sx={{ bgcolor: 'green', color: 'white','&:hover': {
            bgcolor: 'darkgreen',},}}>&lt; Previous</Button>
          <Button variant="contained" onClick={handleNext} sx={{ bgcolor: 'green', color: 'white','&:hover': {
            bgcolor: 'darkgreen',}, }}>Next &gt;</Button>
          </ButtonContainer>
          {movies[currentIndex].titlePoster && (
            <Poster src={movies[currentIndex].titlePoster.replace('{width_variable}', 'w500')} alt={movies[currentIndex].originalTitle} />
          )}
          <Typography variant="h5" gutterBottom>{movies[currentIndex].originalTitle}</Typography>
          <Typography variant="body1" gutterBottom>Genres: {movies[currentIndex].genres.map(genre => genre.genreTitle).join(', ')}</Typography>
          <Typography variant="body1" gutterBottom>Start Year: {movies[currentIndex].startYear}</Typography>
          <Typography variant="body1" gutterBottom>Rating: {movies[currentIndex].rating.avRating}</Typography>
          {/* Εμφάνιση άλλων πληροφοριών της ταινίας εδώ */}
        </InfoContainer>
      )}
    </div>
  );     
};

export default NavigationMenu;
