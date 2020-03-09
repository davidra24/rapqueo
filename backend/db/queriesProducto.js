require("dotenv/config");

const Productos = require("../models/Productos");

getAllProducts = (req, res) => {
  Productos.find().then(data => {
    res.send(data);
  });
};

getOneProduct = (req, res) => {
  const id = req.params.id;
  Productos.findById(id).then(data => {
    res.send(data);
  });
};

postProduct = (req, res) => {
  Productos.create(req.body).then(data => {
    res.send(data);
  });
};

pullProduct = (req, res) => {
  Productos.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(
    data => {
      res.send(data);
    }
  );
};

deleteProduct = (req, res) => {
  Productos.findOneAndRemove(req.params.id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  postProduct,
  pullProduct,
  deleteProduct
};
