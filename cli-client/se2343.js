// Κώδικας του προγράμματος...
var https = require('https');
var fs = require('fs')
const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const baseURL = 'https://localhost:9876/ntuaflix_api';

// Ο κώδικας για να καλέσετε το API endpoint /title/:titleID
async function getTitleById(titleID) {
  try {
    const response = await axios.get(`${baseURL}/title/${titleID}`);
    handleResponse(response.data, format);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchTitleByPart(titlePart) {
  try {
    const requestBody = {
      "titlePart" : titlePart
    }
    const response = await axios.get(`${baseURL}/searchtitle`, { data: requestBody });
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchByGenre(gquery) {
  try {
    if (!gquery) {
      console.error("Invalid or undefined 'gquery'.");
      return;
    }
    const { genre, min } = gquery;
    console.log("Sending request with data:", gquery);
    const response = await axios.get(`${baseURL}/bygenre`,{ data : { genre : params.genre, min : params.min } });
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getNameById(nameID) {
  try {
    const response = await axios.get(`${baseURL}/name/${nameID}`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function searchNameByPart(namePart) {
  try {
    const requestBody = {
      "namePart" : namePart
    }
    console.log(namePart);
    const response = await axios.get(`${baseURL}/searchname`,{ data:  requestBody  });
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
    //console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function healthcheck() {
  try {
    const response = await axios.post(`${baseURL}/healthcheck`);
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function resetAll() {
  try {
    const response = await axios.post(`${baseURL}/resetall`);
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newTitles(filename) {
  try {
    const response = await axios.post(`${baseURL}/newtitles`, { filename });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newAkas(filename) {
  try {
    const response = await axios.post(`${baseURL}/newakas`, { filename });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}


const { Parser } = require('json2csv');
function handleResponse(data, format) {
  // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα ανάλογα με το format
  if (format === 'json') {
    console.log(JSON.stringify(data, null, 2));
  } else if (format === 'csv') {
    const parser = new Parser();
    const csvData = parser.parse(data);
    console.log(csvData);
    // Υλοποιήστε τον κώδικα για το format CSV
  }
}

function handleError(error) {
  console.error(error);
}


function validateParameters(scope, params) {
  const supportedParams = getSupportedParameters(scope);

  for (const paramName in params) {
    const cleanParamName = paramName.startsWith('--') ? paramName.slice(2) : paramName;
    if (!(cleanParamName in supportedParams)) {
      showSupportedParameters(scope);
      //console.error(`Parameter ${paramName} is not supported for scope ${scope}.`);
      process.exit(1);
    }
  }

  // Έλεγχος για την ύπαρξη των απαιτούμενων παραμέτρων
  for (const paramName in supportedParams) {
    const cleanParamName = paramName.startsWith('--') ? paramName.slice(2) : paramName;
    if (supportedParams[paramName] === 'required' && !params[cleanParamName]) {
      showSupportedParameters(scope);
      //console.error(`Parameter ${paramName} is required for scope ${scope}.`);
      process.exit(1);
    }
  }
}

function getSupportedParameters(scope) {
  switch (scope) {
    case 'title':
      return { titleID: 'required', format: 'optional' };
    case 'searchtitle':
      return { titlePart: 'required', format: 'optional' };
    case 'bygenre':
      return { genre: 'required', min: 'required', from: 'optional', to: 'optional', format: 'optional' };
    case 'name':
      return { nameID: 'required', format: 'optional' };
    case 'searchname':
      return { name: 'required', format: 'optional' };
    // Προσθέστε περισσότερα cases για τα υπόλοιπα scopes...
    default:
      return {};
  }
}


// Βασική συνάρτηση για τη διαχείριση της κλήσης από το CLI
function handleCLICommand(scope, params, format) {
  if (Object.keys(params).length === 0) {
    showSupportedParameters(scope);
    process.exit(0);
  }

  validateParameters(scope, params);


  switch (scope) {
    case 'title':
      getTitleById(params.titleID, format);
      break;
    case 'searchtitle':
      searchTitleByPart(params.titlePart, format);
      break;
    case 'bygenre':
      //searchByGenre(params.gquery,format);
      searchByGenre({ genre: params.genre, min: params.min },format);
      break;
    case 'name':
      getNameById(params.nameID, format);
      break;  
    case 'searchname':
      searchNameByPart(params.name,format);
      break;  
    default:
      console.error('Invalid scope.');
      process.exit(1);
  }
}


function showSupportedParameters() {
  const allScopes = ['title', 'searchtitle', 'bygenre', 'name', 'searchname'];

  allScopes.forEach((scope) => {
    const supportedParams = getSupportedParameters(scope);
    console.log(`Supported parameters for scope '${scope}':`);
    
    Object.keys(supportedParams).forEach(param => {
      console.log(`${param}`);
    });
  });
}


// Παράδειγμα χρήσης από το CLI
const args = process.argv.slice(2); // Παίρνει τις παραμέτρους από τη γραμμή εντολών
const [scope, ...rest] = args; // Η πρώτη παράμετρος είναι το scope, το υπόλοιπο είναι παράμετροι
const params = parseParameters(rest); // Φτιάχνει ένα αντικείμενο με τις παραμέτρους
const formatIndex = rest.indexOf('--format');
const format = formatIndex !== -1 ? rest[formatIndex + 1] : 'json'; // Αναζητά την παράμετρο --format

if (params.min) {
  params.min = parseFloat(params.min); // Μετατροπή σε αριθμητική τιμή
}

handleCLICommand(scope, params, format);


function parseParameters(paramArray) {
  const params = {};
  let currentParam = null;

  paramArray.forEach((param) => {
    if (param.startsWith('--')) {
      currentParam = param.slice(2);
      params[currentParam] = true;
    } else if (currentParam) {
      params[currentParam] = param;
      currentParam = null;
    }
  });

  for (const paramName in params) {
    if (params[paramName] === true) {
      console.error(`Value is missing for parameter --${paramName}`);
      process.exit(1);
    }
  }

  return params;
}

