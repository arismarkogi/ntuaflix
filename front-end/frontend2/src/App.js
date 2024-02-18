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
      <main  style={{ minHeight: '349px', maxWidth: '800px', margin: '0 auto' }}>
        {/* Εδώ μπορείτε να προσθέσετε άλλα components για το κυρίως περιεχόμενο */}
        <div>
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
