const { exec } = require('child_process');


// db.js
const mysql = require('mysql');
const { createPool } = require('mysql2/promise');

// Create pool using mysql module
const mysqlPool = mysql.createPool({
  host: 'localhost',
  user: 'ntuaflix_user',
  password: '12345Ab$',
  database: 'ntuaflix_db'
});

// Create pool using mysql2/promise module
const mysql2Pool = createPool({
  host: 'localhost',
  user: 'ntuaflix_user',
  password: '12345Ab$',
  database: 'ntuaflix_db'
});

const executeQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    mysqlPool.query(query, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getConnectionString = async () => {
  return `host: localhost, user: ntuaflix_user, database: ntuaflix_db`;
};

const checkDatabaseConnection = async () => {
  try {
    const queryResult = await mysqlPool.query('SELECT 1');

    if (queryResult) {
      return { "status": 'OK', "dataconnection": await getConnectionString() };
    } else {
      return { "status": 'failed', "dataconnection": await getConnectionString() };
    }
  } catch (error) {
    return { "status": 'failed', "dataconnection": await getConnectionString() };
  }
};


const executeReset = async () => {
  try {
    // Drop the database
    const newPool = mysql.createPool({
      host: 'localhost',
      user: 'ntuaflix_user',
      password: '12345Ab$',
      authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
      },
      protocol: 'mysql_native_password'
    });

    console.log("Before DROP")
    
    await newPool.query("DROP DATABASE IF EXISTS ntuaflix_db");

    console.log("Before Create")
    await newPool.query("CREATE DATABASE ntuaflix_db");

    console.log("Before Command")
    // Create the restore command
    const command = `mysql -h localhost -u ntuaflix_user -p12345Ab$ ntuaflix_db < database/database_dump.sql`;

    await exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('Error during restore:', error.message);
        return;
      }
    
      if (stderr) {
        console.error('Error output during restore:', stderr);
        return;
      }
    
      console.log('Restore successful:', stdout);
    });

  } catch (error) {
    console.error(`Database reset failed: ${error.message}`);
    throw new Error(`Database reset failed: ${error.message}`);
  }
};






module.exports = { executeQuery, checkDatabaseConnection, executeReset, mysqlPool, mysql2Pool };
