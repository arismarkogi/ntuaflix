const express = require('express');
const router = express.Router();
const { titleObject, tqueryObject, gqueryObject, nameObject, nqueryObject} = require('./models.js');
const { json2csv } = require('json-2-csv');


const titleobject = new titleObject();
const nameobject = new nameObject();

function handleErrors(res, error) {
  console.error('Error:', error);

  if (error.name === 'ValidationError') {
    // Handle validation or casting errors
    return res.status(400).json({ error: 'Bad request. Invalid parameters.' });
  }

  if (error.name === 'NotFoundError') {
    // Handle not found errors
    return res.status(404).json({ error: 'Not available. Resource not found.' });
  }

  // For any other errors, return Internal Server Error
  return res.status(500).json({ error: 'Internal server error.' });
}

// Example validation function (replace with your actual validation logic)
function isValidTitleID(titleID) {
  // Add your validation logic here
  return typeof titleID === 'string' && titleID.length > 0;
}

// Function to validate tQueryObject
function isValidtQuery(tQuery) {
  return (tQuery && typeof tQuery === 'object' && 
  typeof tQuery.titlePart === 'string' && tQuery.titlePart.trim().length > 0);
}

function isValidgQuery(gQuery) {
  return (
    gQuery &&
    typeof gQuery === 'object' &&
    typeof gQuery.qgenre === 'string' && gQuery.qgenre.trim().length > 0 &&
    typeof gQuery.minrating === 'number' &&
    (isNaN(gQuery.yrFrom) || gQuery.yrFrom === undefined || typeof gQuery.yrFrom === 'number' ) &&
    (isNaN(gQuery.yrTo) || gQuery.yrTo === undefined || typeof gQuery.yrTo === 'number' )
  );
}

function isValidNameID(nameID) {
  // Add your validation logic here
  return typeof nameID === 'string' && nameID.length > 0;
}

function isValidnQuery(nQuery) {
  return (nQuery && typeof nQuery === 'object' && 
  typeof nQuery.namePart === 'string' && nQuery.namePart.trim().length > 0);
}


function sendResponse(req, res, data) {
  const format = req.query.format || 'json';

  if (format.toLowerCase() === 'csv') {
    convertToCSV(data)
      .then(csvData => {
        res.setHeader('Content-Type', 'text/csv');
        console.log(csvData);
        res.status(200).send(csvData);
      })
      .catch(error => {
        console.error('CSV Conversion Error:', error);
        handleErrors(res, error);
      });
  } else if (format.toLowerCase() === 'json'){
    res.status(200).json(data); // Default to JSON format
  }else{
    const validationError = new Error('Validation Error');
    validationError.name = 'ValidationError';
    throw validationError;
  }
}

const Papa = require('papaparse');

function convertToCSV(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    try {
      const csv = Papa.unparse(data);
      resolve(csv);
    } catch (error) {
      reject(error);
    }
  });
}




router.get('/title/:titleID', async (req, res) => {

  try {
    const { titleID } = req.params;
    if(!isValidTitleID(titleID)){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }

    const titleInstance = await titleobject.getByTitleID(titleID);

    if (!titleInstance) {
      
      res.status(204).send(); // Success without data (empty response)
    } else {
      sendResponse(req, res, titleInstance);
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get('/searchtitle', async (req, res) => {
  try {
    const { titlePart } = req.body;

    const tqueryobject = new tqueryObject(titlePart);
    if(!isValidtQuery(tqueryobject)){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }


    const titleList = await titleobject.getByTitlePart(tqueryobject);
    // Check if titleList is not empty to determine the appropriate status code
    
    if (!titleList) {
      res.status(204).send();
    } else {
      sendResponse(req, res, titleList);
    }
  } catch (error) {
    handleErrors(res, error);
  }});

router.get('/bygenre', async (req, res) => {
  try {
    const { qgenre, minrating, yrFrom, yrTo } = req.body;

    const minratingFloat = parseFloat(minrating, 10);
    const yrFromInt = parseInt(yrFrom, 10);
    const yrToInt = parseInt(yrTo, 10);
    const gqueryobject =  new gqueryObject(qgenre, minratingFloat, yrFromInt, yrToInt);

    if (!isValidgQuery(gqueryobject)) {
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    

    const byGenreList = await titleobject.getByGenre(gqueryobject);
    
    if (!byGenreList) {
      res.status(204).send();
    } else {
      sendResponse(req, res, byGenreList);
    }
  } catch (error) {
    handleErrors(res, error);
  }});

  router.get('/name/:nameID', async (req, res) => {
    try{
      const{nameID} = req.params;

      if(!isValidNameID(nameID)){
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }

      const nameInstance = await nameobject.getByNameID(nameID);

    if (!nameInstance) {
      
      res.status(204).send(); // Success without data (empty response)
    } else {
      sendResponse(req, res, nameInstance);
    }
    }
    catch (error){
      handleErrors(res, error);
    }
  })

  router.get('/searchname', async (req, res) => {

    try{
      const {namePart} = req.body;
      
      const nqueryobject = new nqueryObject(namePart)
      
      if(!isValidnQuery(nqueryobject)){
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }

      const nameList = await nameobject.getByNamePart(nqueryobject);
   
      if (!nameList) {
        res.status(204).send(); // Success without data (empty response)
      } else {
        sendResponse(req, res, nameList);
      }
    }
    catch(error){
      handleErrors(res,error);
    }
  })




module.exports = router;