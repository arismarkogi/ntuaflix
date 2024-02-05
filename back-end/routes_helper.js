let converter = require('json-2-csv');

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
    typeof tQuery.titlePart === 'string');
  }
  
  function isValidgQuery(gQuery) {
    return (
      gQuery &&
      typeof gQuery === 'object' &&
      typeof gQuery.qgenre === 'string' &&
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
    typeof nQuery.namePart === 'string');
  }
  
  
  function sendResponse(req, res, data) {
    const format = req.query.format || 'json';
  
    if (format.toLowerCase() === 'csv') {
          console.log(data);
          csvData = converter.json2csv(data)
          res.setHeader('Content-Type', 'text/csv');
          console.log(csvData);
          res.status(200).send(csvData);
        
    } else if (format.toLowerCase() === 'json'){
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(data); // Default to JSON format
    }else{
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
  }


  module.exports = {sendResponse, isValidNameID, isValidTitleID, isValidgQuery, isValidnQuery, isValidtQuery, handleErrors };
