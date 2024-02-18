const express = require('express');
const router_comp = express.Router();
const { titleObject, tqueryObject, gqueryObject, nameObject, nqueryObject} = require('./models.js');
const { sendResponse, isValidNameID, isValidTitleID, isValidgQuery, isValidnQuery, isValidtQuery, handleErrors } = require('./routes_helper.js');
const bodyParser = require('body-parser');


router_comp.use(bodyParser.json());
const titleobject = new titleObject();
const nameobject = new nameObject();



router_comp.get('/title/:titleID', async (req, res) => {

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

router_comp.get('/searchtitle', async (req, res) => {
  try {
    const { titlePart } = req.body;
    const tqueryobject = new tqueryObject(titlePart);

    if(!isValidtQuery(tqueryobject)){
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }

    console.log("Inside the body request")


    const titleList = await titleobject.getByTitlePart(tqueryobject);
    // Check if titleList is not empty to determine the appropriate status code
    
    if (!titleList || titleList.length === 0) {
      res.status(204).send();
    } else {
      sendResponse(req, res, titleList);
    }
  } catch (error) {
    handleErrors(res, error);
  }});

  router_comp.get('/searchttitle', async (req, res) => {
    try {
      const { titlePart } = req.query; 
      const tqueryobject = new tqueryObject(titlePart)
            
      if (!isValidtQuery(tqueryobject)) {
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }
  
      const titleList = await titleobject.getByTitlePart(tqueryobject);
  
      // Check if titleList is not empty to determine the appropriate status code
      if (!titleList || titleList.length === 0) {
        res.status(204).send();
      } else {
        sendResponse(req, res, titleList);
      }
    } catch (error) {
      handleErrors(res, error);
    }
  });
  

router_comp.get('/bygenre', async (req, res) => {
  try {
    const { qgenre, minrating, yrFrom, yrTo } = req.body;

    if (typeof minrating !== 'string' || !(typeof yrFrom == 'string' ||  yrFrom === undefined) || !(typeof yrTo === 'string' || yrTo === undefined)) {
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    
    const minratingFloat = parseFloat(minrating, 10);
    
    const yrFromInt = typeof yrFrom === 'string' ? parseInt(yrFrom, 10) : yrFrom;
    const yrToInt = typeof yrTo === 'string' ? parseInt(yrTo, 10) : yrTo;

    console.log(yrFromInt)

    const gqueryobject =  new gqueryObject(qgenre, minratingFloat, yrFromInt, yrToInt);
    
    if (!isValidgQuery(gqueryobject)) {
      const validationError = new Error('Validation Error');
      validationError.name = 'ValidationError';
      throw validationError;
    }
    

    const byGenreList = await titleobject.getByGenre(gqueryobject);
    
    if (!byGenreList || byGenreList.length === 0) {
      res.status(204).send();
    } else {
      sendResponse(req, res, byGenreList);
    }
  } catch (error) {
    handleErrors(res, error);
  }});

  router_comp.get('/byggenre/:qgenre/:minrating/:yrFrom?/:yrTo?', async (req, res) => {
    try {
      const { qgenre, minrating, yrFrom, yrTo } = req.params;
  
      if (typeof minrating !== 'string' || !(typeof yrFrom === 'string' || yrFrom === undefined) || !(typeof yrTo === 'string' || yrTo === undefined)) {
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }
      
      const minratingFloat = parseFloat(minrating, 10);
      
      const yrFromInt = typeof yrFrom === 'string' ? parseInt(yrFrom, 10) : yrFrom;
      const yrToInt = typeof yrTo === 'string' ? parseInt(yrTo, 10) : yrTo;
  
      console.log(yrFromInt)
  
      const gqueryobject = new gqueryObject(qgenre, minratingFloat, yrFromInt, yrToInt);
      
      if (!isValidgQuery(gqueryobject)) {
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }
  
      const byGenreList = await titleobject.getByGenre(gqueryobject);
      
      if (!byGenreList || byGenreList.length === 0) {
        res.status(204).send();
      } else {
        sendResponse(req, res, byGenreList);
      }
    } catch (error) {
      handleErrors(res, error);
    }
  });
  

  router_comp.get('/name/:nameID', async (req, res) => {
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
      } 
      else {
        sendResponse(req, res, nameInstance);
      }
    }
    catch (error){
      handleErrors(res, error);
    }
  })

  router_comp.get('/searchname', async (req, res) => {

    try{
      const {namePart} = req.body;
      const nqueryobject = new nqueryObject(namePart)
      
      if(!isValidnQuery(nqueryobject)){
        const validationError = new Error('Validation Error');
        validationError.name = 'ValidationError';
        throw validationError;
      }

      const nameList = await nameobject.getByNamePart(nqueryobject);
   
      if (!nameList || nameList.length === 0) {
        res.status(204).send(); // Success without data (empty response)
      } else {
        sendResponse(req, res, nameList);
      }
    }
    catch(error){
      handleErrors(res,error);
    }
  })

  router_comp.get('/searchname/:namePart', async (req, res) => {
    try {
        const { namePart } = req.params;
        const nqueryobject = new nqueryObject(namePart);

        if (!isValidnQuery(nqueryobject)) {
            const validationError = new Error('Validation Error');
            validationError.name = 'ValidationError';
            throw validationError;
        }

        const nameList = await nameobject.getByNamePart(nqueryobject);

        if (!nameList || nameList.length === 0) {
            res.status(204).send(); // Success without data (empty response)
        } else {
            sendResponse(req, res, nameList);
        }
    } catch (error) {
        handleErrors(res, error);
    }
});

module.exports = router_comp;