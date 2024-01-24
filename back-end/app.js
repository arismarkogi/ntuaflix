const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const routes = require('./routes'); 

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const port = 9876;

app.use('/', routes);

const options = {
    key: fs.readFileSync('./certificates/private-key.pem'),
    cert: fs.readFileSync('./certificates/certificate.pem'),
    requestCert: true,
    rejectUnauthorized: false
  };
  

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
