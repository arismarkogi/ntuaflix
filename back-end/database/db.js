// db.js
const { createPool } = require('mysql');

const pool = createPool({
  host: 'localhost',
  user: 'ntuaflix_user',
  password: '12345Ab$',
  database: 'ntuaflix_db',
  authPlugins: {
    mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
  },
  protocol: 'mysql_native_password',
});

const executeQuery = (query, values) => {
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

module.exports = { executeQuery };
