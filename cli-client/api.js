// api.js
const axios = require('axios');

function getTitleById(titleID) {
  return axios.get(`/title/${titleID}`);
}

function searchTitle(titlePart) {
  return axios.get('/searchtitle', { data: { titlePart } });
}

// Υπόλοιπες συναρτήσεις για τα υπόλοιπα endpoints
