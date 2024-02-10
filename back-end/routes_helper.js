let converter = require('json-2-csv');

  function isValidTSV(req, reqFields){
    
    if (!req.headers['content-type'] || req.headers['content-type'] !== 'text/tab-separated-values') {
      console.error(`Invalid file format. Please provide a TSV file.`);
      return false;
    }
    if(!req.body || Object.keys(req.body).length === 0){
      console.error("The TSV data is empty")
      return false;
    }

    // Find the index of the first newline character
    const firstNewlineIndex = req.body.indexOf('\n');

    // Extract the header from the TSV data
    const header = firstNewlineIndex !== -1 ? req.body.substring(0, firstNewlineIndex) : req.body;

    // Check if the request body has at least one row (header)
    if (!header) {
      console.error(`The TSV data does not contain a valid header.`);
      return false;
    }

    const headerFields = header.split('\t');

    // Check if all required fields are present in the header
    for (const field of reqFields) {
      if (!headerFields.includes(field)) {
        console.error(`Required field '${field}' is missing in the TSV data.`);
        return false;
      }
    }

    return true;
  }

  // Example validation function (replace with your actual validation logic)
  function isValidTitleID(titleID) {
    // Regular expression pattern for the specified format
    const pattern = /^tt\d{7}$/;
  
    // Check if the titleID matches the pattern
    return typeof titleID === 'string' && pattern.test(titleID);
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
    const pattern = /^nm\d{7}$/;
    // Check if the titleID matches the pattern
    return typeof nameID === 'string' && pattern.test(nameID);
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

  function handleErrors(res, error) {
    console.error('Error:', error);
  
    if (error.name === 'ValidationError') {
      // Handle validation or casting errors
      return res.status(400).json({ error: 'Bad request. Invalid parameters.' });
    }
  
    // For any other errors, return Internal Server Error
    return res.status(500).json({ error: 'Internal server error.' });
  }

  module.exports = {isValidTSV, sendResponse, isValidNameID, isValidTitleID, isValidgQuery, isValidnQuery, isValidtQuery, handleErrors };
