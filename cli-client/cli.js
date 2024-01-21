// cli.js
const api = require('./api');

const command = process.argv[2];

switch (command) {
  case 'getTitleById':
    api.getTitleById(process.argv[3])
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    break;
  case 'searchTitle':
    api.searchTitle(process.argv[3])
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
    break;
  // Υπόλοιπες εντολές για τα υπόλοιπα endpoints
  default:
    console.log('Unknown command');
}
