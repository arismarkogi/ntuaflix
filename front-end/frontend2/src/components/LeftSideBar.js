import React from 'react';
import axios from 'axios';

const LeftSidebar = () => {
  const handleHealthCheck = () => {
    axios.get('/admin/healthcheck')
      .then(response => {
        console.log(response.data);
        // Εδώ μπορείτε να χειριστείτε την απάντηση ανάλογα με τις ανάγκες σας
      })
      .catch(error => {
        console.error('Error performing health check:', error);
      });
  };

  const handleResetAll = () => {
    axios.post('/admin/resetall')
      .then(response => {
        console.log(response.data);
        // Εδώ μπορείτε να χειριστείτε την απάντηση ανάλογα με τις ανάγκες σας
      })
      .catch(error => {
        console.error('Error performing reset all:', error);
      });
  };

  return (
    <div className="left-sidebar">
      <ul>
        <li>
          <button onClick={handleHealthCheck}>Health Check</button>
        </li>
        <li>
          <button onClick={handleResetAll}>Reset All</button>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
