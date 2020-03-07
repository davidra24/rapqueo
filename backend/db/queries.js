require('dotenv/config');
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

const Categorias = require('../models/Categorias');

getAllCategories = (req, res) => {
  Categorias.find().then(data => {
    res.send(data);
  });
};

postCategorie = (req, res) => {
  new Categorias(req.body);
};

module.exports = {
  getAllCategories,
  postCategorie
};
