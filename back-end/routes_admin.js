const express = require('express');
const router_admin = express.Router();
const { isValidTSV, handleErrors } = require('./routes_helper.js');
const { checkDatabaseConnection, executeReset} = require('./database/db.js');
const bodyParser = require('body-parser')
const {insertTitleBasics, insertTitleAkas, insertNameBasics, insertTitleCrew, insertTitleEpisode, insertTitlePrincipals, insertTitleRatings} = require('./database/dbInserts.js')

router_admin.use(bodyParser.text({ type: 'text/tab-separated-values' }));

router_admin.get('/admin/healthcheck', async (req, res) => {
  try {
    // Check database connectivity
    const connectionResult = await checkDatabaseConnection();
    
    if (connectionResult.status === 'OK') {
      res.status(200).json(connectionResult);
    } else {
      res.status(500).json(connectionResult);
    }
  } catch (error) {
    res.status(500).json({ status: 'failed', error: error.message });
  }
});

router_admin.post('/admin/upload/titlebasics', async (req, res) => {
  try{
    if(!isValidTSV(req, ["tconst",	"titleType",	"primaryTitle",	"originalTitle",	"isAdult",	"startYear",	"endYear",	"runtimeMinutes",	"genres",	"img_url_asset"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitleBasics(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/upload/titleakas', async (req, res) => {
  try{
    if(!isValidTSV(req, ["titleId",	"ordering", "title",	"region",	"language",	"types", "attributes", "isOriginalTitle"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitleAkas(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/upload/namebasics', async (req, res) => {
  try{
    if(!isValidTSV(req, ["nconst",	"primaryName",	"birthYear",	"deathYear",	"primaryProfession",	"knownForTitles",	"img_url_asset"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertNameBasics(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/upload/titlecrew', async (req, res) => {

  try{
    if(!isValidTSV(req, ["tconst", "directors", "writers"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitleCrew(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/upload/titleepisode', async (req, res) => {

  console.log(req.body)
  try{
    if(!isValidTSV(req, ["tconst", "parentTconst",	"seasonNumber",	"episodeNumber"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitleEpisode(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})


router_admin.post('/admin/upload/titleprincipals', async (req, res) => {
  try{
    if(!isValidTSV(req, ["tconst", "ordering", "nconst", "category", "job",	"characters", "img_url_asset"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitlePrincipals(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/upload/titleratings', async (req, res) => {
  try{
    if(!isValidTSV(req, ["tconst", "averageRating", "numVotes"])){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    await insertTitleRatings(req.body);
    res.status(200).json({ status: 'OK' });
  }
  catch (error){
    handleErrors(res, error);
  }
  
})

router_admin.post('/admin/resetall', async (req, res) => {
  try {
    // Execute reset function
    await executeReset();

    // Return success response
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    // Return failure response with error information
    res.status(500).json({ status: 'failed', reason: error.message });
  }
});

module.exports = router_admin;