const axios = require('axios');

const baseURL = 'https://{{host}}:9876/ntuaflix_api'; // Αντικαταστήστε με το πραγματικό base URL

function getTitleById(titleID) {
  return axios.get(`${baseURL}/title/${titleID}`);
}

function searchTitleByPart(titlePart) {
  return axios.get(`${baseURL}/searchtitle`, { data: { titlePart } });
}

function searchByGenre(gquery) {
  return axios.get(`${baseURL}/bygenre`, { data: gquery });
}

function getNameById(nameID) {
  return axios.get(`${baseURL}/name/${nameID}`);
}

function searchNameByPart(namePart) {
  return axios.get(`${baseURL}/searchname`, { data: { namePart } });
}

module.exports = {
  getTitleById,
  searchTitleByPart,
  searchByGenre,
  getNameById,
  searchNameByPart,
};
