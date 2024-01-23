const axios = require('axios');

const baseURL = 'https://{{host}}:9876/ntuaflix_api';

// Ο κώδικας για να καλέσετε το API endpoint /title/:titleID
async function getTitleById(titleID) {
  try {
    const response = await axios.get(`${baseURL}/title/${titleID}`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchTitleByPart(titlePart) {
  try {
    const response = await axios.get(`${baseURL}/searchtitle`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchByGenre(gquery) {
  try {
    const response = await axios.get(`${baseURL}/bygenre`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getNameById(nameID) {
  try {
    const response = await axios.get(`${baseURL}/name/${nameID}`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchNameByPart(namePart) {
  try {
    const response = await axios.get(`${baseURL}/searchname`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

