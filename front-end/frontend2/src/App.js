import React from 'react';
import SearchBar from './components/SearchBar';
import NavigationMenu from './components/MovieList';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css'
const HomePage = () => {
  return (
    <div className="container">
      <header>
        <Header/>
      </header>
      <SearchBar />
      <main>
        {/* Εδώ μπορείτε να προσθέσετε άλλα components για το κυρίως περιεχόμενο */}
        <div className="navigation">
          <NavigationMenu />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;
