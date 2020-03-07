const express = require('express');
const api = express.Router();
const queryCategoria = require('../db/queriesCategria');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGOLAB_ONYX_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => {
    console.log('CONNECTED DATABASE');
  })
  .catch(err => console.log('Error: ', err));

/**
 * Categorías
 */
api.get('/categories', queryCategoria.getAllCategories);
api.get('/categories/:id', queryCategoria.getOneCategorie);
api.post('/categories', queryCategoria.postCategorie);
api.put('/categorie/:id', queryCategoria.pullCategorie);
api.delete('/categorie/:id', queryCategoria.deleteCategorie);

module.exports = api;
