//import logo from './logo.svg';


/*
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function App() {
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
        <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
      </header>
    </div>
  );
}
*/
//export default App;

/*
function MyButton() {
  return (
    <button>
      I'm a button
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
    </div>
  );
}
*/
// App.js

import React from 'react';
import HomePage from './components/HomePage'; // Η διαδρομή αναφέρεται στο φάκελο components
import './App.css';
//import './components/Footer';
//import './components/Header';

const App = () => {
  return (
    <div className='App'> 
      <main>
        {/* Το κεντρικό περιεχόμενο της σελίδας εδώ */}
      </main>
      <HomePage />
    </div>
  );
}

export default App;
