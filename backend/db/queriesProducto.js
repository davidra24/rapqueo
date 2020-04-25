require('dotenv/config');

const Productos = require('../models/Productos');
const Promos = require('../models/Promociones');

getAllProducts = (req, res) => {
  Productos.find().then((data) => {
    res.send(data);
  });
};

getProductWithoutCategorie = (req, res) => {
  Productos.find({ idCategoria: null }).then((data) => {
    res.send(data);
  });
};

getOneProduct = (req, res) => {
  const id = req.params.id;
  Productos.findById(id).then((data) => {
    res.send(data);
  });
};

getProductsByCategorie = (req, res) => {
  const id = req.params.id;
  Productos.find({ idCategoria: id }).then((data) => {
    res.send(data);
  });
};

postProduct = (req, res) => {
  Productos.create(req.body).then((data) => {
    res.send(data);
  });
};

pullProduct = (req, res) => {
  Productos.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send({ code: 200, data, msg: 'Ok' });
    })
    .catch((err) => {
      res.send({ code: 500, msg: err });
    });
};

deleteProduct = (req, res) => {
  Productos.findByIdAndRemove(req.params.id).then((data) => {
    Promos.find().then(async (response) => {
      response.forEach(async (element) => {
        if (element.producto._id) {
          await Promos.findByIdAndRemove(element._id);
        }
      });
      res.send(data);
    });
  });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  getProductsByCategorie,
  getProductWithoutCategorie,
  postProduct,
  pullProduct,
  deleteProduct,
};
