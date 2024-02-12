import React from 'react';
import LeftSidebar from './LeftSideBar';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Ntuaflix!</h1>
      <p>Explore the latest movies and TV shows.</p>
      {<LeftSidebar />}
    </div>
  );
}


export default HomePage;
