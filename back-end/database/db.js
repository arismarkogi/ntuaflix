// db.js

import { createPool } from 'mysql';

// Create a MySQL connection pool
const pool = createPool({
  host: 'localhost',
  user: 'ntuaflix_user',
  password: '12345Ab$',
  database: 'ntuaflix_db',
  connectionLimit: 10, // Adjust this based on your requirements
});

// Function to execute a query
export const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
