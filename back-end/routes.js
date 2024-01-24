// Υποθέτοντας ότι έχετε ένα αρχείο δρομολόγησης όπως routes.js ή index.js

const express = require('express');
const router = express.Router();

// Υποθέτοντας ότι έχετε μια διαδρομή για τα ονόματα
router.get('/ntuaflix_api/name/:nameID', (req, res) => {
  const nameID = req.params.nameID;
  // Εκτέλεση κώδικα για ανταπόκριση στο αίτημα
  res.send(`Hello, you requested details for name with ID: ${nameID}`);
});

module.exports = router;
