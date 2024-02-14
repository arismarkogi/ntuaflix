const express = require('express');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const routes_comp = require('./routes_compulsory'); 
const routes_admin = require('./routes_admin');
const path = require('path');



const app = express();
const port = 9876;

app.use(cors());
app.use('/ntuaflix_api', routes_comp);
app.use('/ntuaflix_api', routes_admin)


const options = {
  key: fs.readFileSync(path.join(__dirname, 'certificates/private-key.pem')),  // Modify this line
  cert: fs.readFileSync(path.join(__dirname, 'certificates/certificate.pem')), // Modify this line
};
  

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});


