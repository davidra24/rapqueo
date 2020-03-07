const express = require('express');
const api = express.Router();
const query = require('../db/queries');

api.get('/categories', query.getAllCategories);
api.post('/categories', query.postCategorie);

module.exports = api;
