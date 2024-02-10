// db.js
const { createPool } = require('mysql2/promise');
const { exec } = require('child_process');


const pool = createPool({
  host: 'localhost',
  user: 'ntuaflix_user',
  password: '12345Ab$',
  database: 'ntuaflix_db'
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






module.exports = { executeQuery, checkDatabaseConnection, executeReset, pool };
