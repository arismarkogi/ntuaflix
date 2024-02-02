/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/

import React, { useState, useEffect } from 'react';
function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://localhost:9876/ntuaflix_api')
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Το [] σημαίνει ότι αυτό θα εκτελεστεί μόνο μια φορά μετά τη φόρτωση του component.
  return (
    <div className="App">
      <h1>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
  // Εδώ μπορείτε να χρησιμοποιήσετε τα δεδομένα που ανακτήθηκαν από το REST API (π.χ., render μια λίστα ταινιών).
}

export default App;
