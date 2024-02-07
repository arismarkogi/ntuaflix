// db.js
const { createPool } = require('mysql');
const { readFileSync } = require('fs');
const { resolve } = require('path');


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

const checkDatabaseConnection = async () => {
  try {
    const queryResult = await executeQuery('SELECT 1', null);
    
    if (queryResult && queryResult.length > 0 && queryResult[0]['1'] === 1) {
      return { status: 'OK', dataconnection: await getConnectionString() };
    } else {
      return { status: 'failed', dataconnection: await getConnectionString() };
    }
  } catch (error) {
    return { status: 'failed', dataconnection: await getConnectionString() };
  }
};

const getConnectionString = async () => {
  return `host: ${pool.config.connectionConfig.host}, user: ${pool.config.connectionConfig.user}, database: ${pool.config.connectionConfig.database}`;
};
const executeReset = async () => {
  try {
    // Drop the database
    const newPool = createPool({
      host: 'localhost',
      user: 'ntuaflix_user',
      password: '12345Ab$',
      authPlugins: {
        mysql_native_password: () => require('mysql2/lib/auth/mysql_native_password')
      },
      protocol: 'mysql_native_password',
    });
    
    await newPool.query('DROP DATABASE IF EXISTS ntuaflix_db');
    await newPool.query('CREATE DATABASE ntuaflix_db')

    // Use absolute paths for SQL files
    const tablesSqlPath = resolve(__dirname, 'tables.sql');
    const dataDumpSqlPath = resolve(__dirname, 'data_dump.sql');

   // Read and execute tables.sql
   const tablesSql = readFileSync(tablesSqlPath, 'utf8');
   const tablesStatements = tablesSql.split(';');

   for (const statement of tablesStatements) {
    if (statement.trim() !== '') {
      console.log(statement);
  
      try {
        await pool.query(statement);
        console.log(`Query executed successfully: ${statement}`);
      } catch (error) {
        console.error(`Error executing query: ${statement}\nError: ${error.message}`);
        // Optionally, throw the error to propagate it further
        // throw new Error(`Error executing query: ${statement}\nError: ${error.message}`);
      }
    }
  }
  
    // Read and execute data_dump.sql
    const dataDumpSql = readFileSync(dataDumpSqlPath, 'utf8');
    const dataDumpStatements = dataDumpSql.split(';');
    for (const statement of dataDumpStatements) {
      if (statement.trim() !== '') {
        console.log(statement);
    
        try {
          await pool.query(statement);
          console.log(`Query executed successfully: ${statement}`);
        } catch (error) {
          console.error(`Error executing query: ${statement}\nError: ${error.message}`);
          // Optionally, throw the error to propagate it further
          // throw new Error(`Error executing query: ${statement}\nError: ${error.message}`);
        }
      }
    }

    console.log('Database reset successful');
  } catch (error) {
    console.error(`Database reset failed: ${error.message}`);
    throw new Error(`Database reset failed: ${error.message}`);
  }
};






module.exports = { executeQuery, checkDatabaseConnection, executeReset };
