require('dotenv/config');

const Pedidos = require('../models/Pedidos');

getAllOrders = (req, res) => {
  Pedidos.find().then(data => {
    res.send(data);
  });
};

getOneOrder = (req, res) => {
  const id = req.params._id;
  Pedidos.findById(id).then(data => {
    res.send(data);
  });
};

postOrder = (req, res) => {
  Pedidos.create(req.body).then(data => {
    res.send(data);
  });
};

pullOrder = (req, res) => {
  Pedidos.findByIdAndUpdate(
    req.params._id,
    req.body,
    (err, todo) => {}
  ).then(data => {
    res.send(data);
  });
};

deleteOrder = (req, res) => {
  Pedidos.findOneAndRemove(req.params._id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllOrders,
  getOneOrder,
  postOrder,
  pullOrder,
  deleteOrder
};
