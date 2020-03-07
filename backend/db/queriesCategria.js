require('dotenv/config');

const Categorias = require('../models/Categorias');

getAllCategories = (req, res) => {
  Categorias.find().then(data => {
    res.send(data);
  });
};

getOneCategorie = (req, res) => {
  const id = req.params._id;
  Categorias.findById(id).then(data => {
    res.send(data);
  });
};

postCategorie = (req, res) => {
  Categorias.create(req.body).then(data => {
    res.send(data);
  });
};

pullCategorie = (req, res) => {
  Categorias.findByIdAndUpdate(
    req.params._id,
    req.body,
    (err, todo) => {}
  ).then(data => {
    res.send(data);
  });
};

deleteCategorie = (req, res) => {
  Categorias.findOneAndRemove(req.params._id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllCategories,
  getOneCategorie,
  postCategorie,
  pullCategorie,
  deleteCategorie
};
