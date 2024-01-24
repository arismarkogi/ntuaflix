const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 9876;


const options = {
    key: fs.readFileSync('./certificates/private-key.pem'),
    cert: fs.readFileSync('./certificates/certificate.pem'),
  };
  

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
