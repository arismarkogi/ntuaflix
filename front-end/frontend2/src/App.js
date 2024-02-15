import logo from './logo.svg';

import React from 'react';
import HomePage from './components/HomePage'; // Η διαδρομή αναφέρεται στο φάκελο components
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';



export default function App() {
  return (
    <div className="App">
      <Header /> {/* Προσθήκη του Header */}
      <div>
        <main>
          <HomePage />
        </main>
        <Footer />
      </div>
    </div>
  );
}


// App.js
/*
import React from 'react';
import HomePage from './components/HomePage'; // Η διαδρομή αναφέρεται στο φάκελο components
import './App.css';
//import './components/Footer';
import Header from './components/Header';

const App = () => {
  return (
    <div className='App'> 
    <Header />
      <main>
      <HomePage />
      </main>
    </div>
  );
}

export default App;
*/