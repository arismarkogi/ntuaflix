const express = require('express');
const router = express.Router();
const { titleObject, tqueryObject, gqueryObject, nameObject, nqueryObject} = require('./models.js');
const {sendResponse, isValidNameID, isValidTitleID, isValidgQuery, isValidnQuery, isValidtQuery, handleErrors } = require('./routes_helper.js');
const { checkDatabaseConnection, executeReset } = require('./database/db.js');


const titleobject = new titleObject();
const nameobject = new nameObject();

router.get('/admin/healthcheck', async (req, res) => {
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

router.post('/admin/resetall', async (req, res) => {
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






router.get('/title/:titleID', async (req, res) => {

  try {
    const { titleID } = req.params;
    if(!isValidTitleID(titleID)){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }

    const titleInstance = await titleobject.getByTitleID(titleID);

    if (titleInstance.titleID === null) {
      
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
    console.log(req.body);

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

    if (nameInstance.nameID === null) {
      
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