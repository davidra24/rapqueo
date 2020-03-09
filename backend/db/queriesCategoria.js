require("dotenv/config");

const Categorias = require("../models/Categorias");

getAllCategories = (req, res) => {
  Categorias.find().then(data => {
    res.send(data);
  });
};

getOneCategorie = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Categorias.findById(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send("404");
    });
};

postCategorie = (req, res) => {
  Categorias.create(req.body)
    .then(data => {
      console.log(req.body);
      res.send(data);
    })
    .catch(err => {
      console.log("Error");
      console.log(err);
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
