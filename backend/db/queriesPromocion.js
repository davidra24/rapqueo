require('dotenv/config');

const Promociones = require('../models/Promociones');
const Productos = require('../models/Productos');

getAllPromos = (req, res) => {
  Promociones.find().then((data) => {
    res.send(data);
  });
};

getOnePromo = (req, res) => {
  const id = req.params.id;
  Promociones.findById(id).then((data) => {
    res.send(data);
  });
};

postPromo = async (req, res) => {
  const producto = await Productos.findById(req.body.idProducto);
  const promocion = new Promociones(req.body);
  promocion.producto = producto;
  promocion.markModified('producto');
  await promocion.save();
  await res.send(promocion);
};

pullPromo = (req, res) => {
  Promociones.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, todo) => {}
  ).then((data) => {
    res.send(data);
  });
};

deletePromo = (req, res) => {
  Promociones.findByIdAndRemove(req.params.id).then((data) => {
    res.send(data);
  });
};

module.exports = {
  getAllPromos,
  getOnePromo,
  postPromo,
  pullPromo,
  deletePromo,
};
