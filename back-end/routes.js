const express = require('express');
const router = express.Router();
const { titleObject, tQueryObject, gQueryObject } = require('./models');

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
    typeof gQuery.minrating === 'string' && gQuery.minrating.trim().length > 0 &&
    (gQuery.yrFrom === undefined || (typeof gQuery.yrFrom === 'string' && gQuery.yrFrom.trim().length > 0)) &&
    (gQuery.yrTo === undefined || (typeof gQuery.yrTo === 'string' && gQuery.yrTo.trim().length > 0))
  );
}



router.get('/title/:titleID', async (req, res) => {
  const { titleID } = req.params;

  try {

    if(!isValidTitleID){
      throw new ValidationError('ValidationError');
    }

    const titleInstance = await getTitleInstance(titleID);

    if (Object.keys(titleInstance).length > 0) {
      res.status(200).json(titleInstance); // Success with data
    } else {
      res.status(204).send(); // Success without data (empty response)
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

router.get('/searchtitle', async (req, res) => {
  const { titlePart } = req.body;



  try {
    if(!isValidtQuery){
      throw new ValidationError('ValidationError');
    }


    const titleList = await new titleObject().getByTitlePart(new tQueryObject(titlePart));
    // Check if titleList is not empty to determine the appropriate status code
    if (titleList.length > 0) {
      res.status(200).json(titleList); // Success with data
    } else {
      res.status(204).send(); // Success without data (empty response)
    }
  } catch (error) {
    handleErrors(res, error);
  }});

router.get('/bygenre', async (req, res) => {
  const { qgenre, minrating, yrFrom, yrTo } = req.body;

  try {

    if(!isValidgQuery){
      throw new ValidationError('ValidationError');
    }

    const byGenreList = await new titleObject().getByGenre(new gQueryObject(qgenre, minrating, yrFrom, yrTo));
    
    if (byGenreList.length > 0) {
      res.status(200).json(byGenreList); // Success with data
    } else {
      res.status(204).send(); // Success without data (empty response)
    }
  } catch (error) {
    handleErrors(res, error);
  }});

module.exports = router;