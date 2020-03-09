require("dotenv/config");

const Promociones = require("../models/Promociones");

getAllPromos = (req, res) => {
  Promociones.find().then(data => {
    res.send(data);
  });
};

getOnePromo = (req, res) => {
  const id = req.params.id;
  Promociones.findById(id).then(data => {
    res.send(data);
  });
};

postPromo = (req, res) => {
  Promociones.create(req.body).then(data => {
    res.send(data);
  });
};

pullPromo = (req, res) => {
  Promociones.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, todo) => {}
  ).then(data => {
    res.send(data);
  });
};

deletePromo = (req, res) => {
  Promociones.findOneAndRemove(req.params.id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllPromos,
  getOnePromo,
  postPromo,
  pullPromo,
  deletePromo
};
