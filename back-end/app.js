const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const routes = require('./routes'); 
const path = require('path');
const bodyParser = require('body-parser');



const app = express();
const port = 9876;

app.use(bodyParser.json());
app.use('/ntuaflix_api', routes);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates/private-key.pem')),  // Modify this line
  cert: fs.readFileSync(path.join(__dirname, 'certificates/certificate.pem')), // Modify this line
};
  

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
