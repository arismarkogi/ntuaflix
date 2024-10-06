#!/usr/bin/env node

// Κώδικας του προγράμματος...
var https = require('https');
var fs = require('fs')
const axios = require('axios');
const readline = require('readline');



process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const baseURL = 'https://localhost:9876/ntuaflix_api';

// Ο κώδικας για να καλέσετε το API endpoint /title/:titleID
async function getTitleById(titleID) {
  try {
    const response = await axios.get(`${baseURL}/title/${titleID}`);
    handleResponse(response.data, format);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
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
    requestBody = {
      "qgenre": gquery.genre,
      "minrating": gquery.min,
      "yrFrom": gquery.from, 
      "yrTo": gquery.to
    }
    const response = await axios.get(`${baseURL}/bygenre`,{ data : requestBody });
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function getNameById(nameID) {
  try {
    const response = await axios.get(`${baseURL}/name/${nameID}`);
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function searchNameByPart(namePart) {
  try {
    const requestBody = {
      "namePart" : namePart
    }
    const response = await axios.get(`${baseURL}/searchname`,{ data:  requestBody  });
    // Εδώ μπορείτε να επεξεργαστείτε τα δεδομένα που έχετε λάβει από το back-end
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

/*async function healthcheck() {
  try {
    const response = await axios.post(`${baseURL}/healthcheck`);
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}*/
async function healthcheck() {
  try {
    const response = await axios.get(`${baseURL}/admin/healthcheck`);
    
    if (response.status === 200) {
      handleResponse(response.data, format);
    } else {
      handleResponse(response.data, format);
    }
  } catch (error) {
    console.error('Error during health check:', error.message);
  }
}

async function resetall() {
  try {
    const response = await axios.post(`${baseURL}/admin/resetall`);
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newtitles(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titlebasics`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newakas(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titleakas`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newnames(filename) {
  //console.log(filename);
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/namebasics`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newcrew(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titlecrew`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newepisode(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titleepisode`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newprincipals(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titleprincipals`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

async function newratings(filename) {
  try {
    const fileContent = fs.readFileSync(filename, 'utf8');
    const response = await axios.post(`${baseURL}/admin/upload/titleratings`, fileContent, {
      headers: {
        'Content-Type': 'text/tab-separated-values'
      }
    });
    handleResponse(response.data, format);
  } catch (error) {
    console.error(error);
  }
}

let converter = require('json-2-csv');
const { help } = require('yargs');
function handleResponse(data, format) {
  
  const myformat = format || 'json';
  //console.log("myformat: ", myformat)
  if (myformat.toLowerCase() === 'csv') {
          csvData = converter.json2csv(data);
          csvData = csvData.replace(/""/g, '"');
          csvData = csvData.replace(/"\[/g, '[');
          csvData = csvData.replace(/\]"/g, ']');

          console.log(csvData);
        
    } else if (myformat.toLowerCase() === 'json'){
      const jsonString = JSON.stringify(data, null, 2);
      console.log(jsonString)
    } else{
      console.log("Format not supported")
    }
}

function handleError(error) {
  console.error(error);
}

function validateParameters(scope, params) {
  if (scope != 'healthcheck' && scope != 'resetall'){
    const supportedParams = getSupportedParameters(scope);

    for (const paramName in params) {
      const cleanParamName = paramName.startsWith('--') ? paramName.slice(2) : paramName;
      if (!(cleanParamName in supportedParams)) {
        showSupportedParameters(scope);
        //process.exit(1);
      }
    }

    // Έλεγχος για την ύπαρξη των απαιτούμενων παραμέτρων
    for (const paramName in supportedParams) {
      const cleanParamName = paramName.startsWith('--') ? paramName.slice(2) : paramName;
      if (supportedParams[paramName] === 'required' && !params[cleanParamName]) {
        showSupportedParameters(scope);
        //process.exit(1);
      }
    }
  
  } 
  else {
      if (args.length > 1 && rest.length > 0) {
        /*
        if(scope == 'resetall'){
          console.log('The "resetall" scope does not require any parameters.');
          process.exit(0);
        }else{
          console.log('The "healthcheck" scope does not require any parameters.');
          process.exit(0);
        }*/
        if(scope == 'resetall' || scope == 'healthcheck'){
          console.log(`The '${scope}' scope does not require any parameters.`);
          //process.exit(0);
        }
      }
    }
}

function getSupportedParameters(scope) {
  switch (scope) {
    case 'title':
      return { titleID: 'required', format: 'optional' };
    case 'searchtitle':
      return { titlepart: 'required', format: 'optional' };
    case 'bygenre':
      return { genre: 'required', min: 'required', from: 'optional', to: 'optional', format: 'optional' };
    case 'name':
      return { nameid: 'required', format: 'optional' };
    case 'searchname':
      return { name: 'required', format: 'optional' };
    case 'healthcheck':
      return {null:null};
    case 'resetall':
      return {null:null}
    case 'newtitles':
      return {filename : 'required', format: 'optional'};
    case 'newakas':
      return { filename: 'required', format: 'optional' };
    case 'newnames':
      return { filename: 'required', format: 'optional' };
    case 'newcrew':
      return { filename: 'required', format: 'optional' };
    case 'newepisode':
      return { filename: 'required', format: 'optional' };
    case 'newprincipals':
      return { filename: 'required', format: 'optional' };
    case 'newratings':
      return { filename: 'required', format: 'optional' };
    // Προσθέστε περισσότερα cases για τα υπόλοιπα scopes...
    default:
      return {};
  }
}


// Βασική συνάρτηση για τη διαχείριση της κλήσης από το CLI
async function handleCLICommand(scope, params, format) {
  if (scope != "healthcheck" && scope != "resetall"){
    if (Object.keys(params).length === 0) {
      showSupportedParameters(scope);
      //process.exit(0);
    }
  }

  validateParameters(scope, params);


  switch (scope) {
    case 'title':
      await getTitleById(params.titleID, format);
      break;
    case 'searchtitle':
      await searchTitleByPart(params.titlepart, format);
      break;
    case 'bygenre':
      await searchByGenre({ genre : params.genre, min : params.min, from : params.from, to : params.to},format);
      break;
    case 'name':
      await getNameById(params.nameid, format);
      break;  
    case 'searchname':
      await searchNameByPart(params.name,format);
      break;  
    case 'healthcheck':
      await healthcheck();
      break;
    case 'resetall':
      await resetall();
      break;
    case 'newtitles':
      await newtitles(params.filename,format);
      break;
    case 'newakas':
      await newakas(params.filename, format);
      break;
    case 'newnames':
      await newnames(params.filename,format);
      break;
    case 'newcrew':
      await newcrew(params.filename,format);
      break;
    case 'newepisode':
      await newepisode(params.filename,format);
      break;
    case 'newprincipals':
      await newprincipals(params.filename,format);
      break;
    case 'newratings':
      await newratings(params.filename,format);
      break;
    default:
      console.error('Invalid scope.');
      //process.exit(1);
  }
}


function showSupportedParameters() {
  const allScopes = ['title', 'searchtitle', 'bygenre', 'name', 'searchname', 'healthcheck', 'resetall','newtitles','newakas','newnames','newcrew','newepisode',
                     'newprincipals','newratings'];
                     
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


//handleCLICommand(scope, params, format);

function parseParameters(paramArray) {
  const params = {};
  let currentParam = null;

  /*
  if (scope === 'healthcheck') {
    // Αν το scope είναι 'healthcheck', αγνοήστε τυχόν παραμέτρους και εμφανίστε μόνο μήνυμα σφάλματος
    if (paramArray.length > 0) {
      console.error(`The 'healthcheck' scope does not require any parameters.`);
      process.exit(1);
    }
    return params;
  }else if (scope === 'resetall') {
    if (paramArray.length > 0) {
      console.error(`The 'resetall' scope does not require any parameters.`);
      process.exit(1);
    }
    return params;
  }*/

  if (scope === 'healthcheck' || scope === 'resetall') {
    // Αν το scope είναι 'healthcheck', αγνοήστε τυχόν παραμέτρους και εμφανίστε μόνο μήνυμα σφάλματος
    if (paramArray.length > 0) {
      console.error(`The '${scope}' scope does not require any parameters.`);
      //process.exit(1);
    }
    return params;
  }else if (scope === 'newtitles' || scope === 'newakas' || scope === 'newnames' || scope === 'newcrew' || scope === 'newepisode' || scope === 'newepisode' || scope === 'newprincipals' || scope === 'newratings') {
    const filenameIndex = paramArray.indexOf('--filename');
    if (filenameIndex === -1 || filenameIndex === paramArray.length - 1) {
      console.error(`Value is missing for parameter --filename`);
      //process.exit(1);
    }
    params.filename = paramArray[filenameIndex + 1];
    return params;
  }

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
      //process.exit(1);
    }
  }
  return params;
}

handleCLICommand(scope, params, format)

/*
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function runInteractive() {
  return new Promise((resolve) => {
    rl.question('\x1b[36m$\x1b[0m ', (command) => {

      // Ensure the first string is "2343"
      if (!command.startsWith('se2343')) {
        reject(new Error('Invalid command. The first string must be "se2343".'));
        return;
      }

      // Extract the rest of the command
      const args = command.split(' ').slice(1);
      const [scope, ...rest] = args;
      const params = parseParameters(rest);
      const formatIndex = rest.indexOf('--format');
      const format = formatIndex !== -1 ? rest[formatIndex + 1] : 'json';

      resolve({ scope, params, format });
    });
  });
}

async function main() {
  if (process.argv.length <= 2) {
    while(1){
    // If no command-line arguments, run in interactive mode
    const { scope, params, format } = await runInteractive();
    await handleCLICommand(scope, params, format);
    console.log();
    }
  } else {
    // Command-line mode
    const args = process.argv.slice(2);
    const [scope, ...rest] = args;
    const params = parseParameters(rest);
    const formatIndex = rest.indexOf('--format');
    const format = formatIndex !== -1 ? rest[formatIndex + 1] : 'json';

    await handleCLICommand(scope, params, format);
  }
}

main();
*/
