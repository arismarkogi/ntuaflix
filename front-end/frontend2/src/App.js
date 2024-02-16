// App.js

import React from 'react';
import './App.css';
//import MovieList from './components/MovieList';
import Header from './components/Header';
import Footer from './components/Footer';
//import HomePage from './components/HomePage';
//import MovieList from './components/MovieList';

const App = () => {
  return (
    <div >
      <Header />
      <main>
        <h1> hello world</h1>
      </main>
        {/*<h1>React Functional Component</h1>*/}
        <Footer />
    </div>
  );
}

export default App;
