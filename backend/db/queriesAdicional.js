require("dotenv/config");

const Adicional = require("../models/Adicional");

getAditional = (req, res) => {
  const id = req.params.id;
  Adicional.findById(id).then((data) => {
    res.send(data);
  });
};

postAditional = (req, res) => {
  Adicional.create(req.body).then((data) => {
    res.send(data);
  });
};

pullAditional = (req, res) => {
  Adicional.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send({ code: 200, data, msg: "Ok" });
    })
    .catch((err) => {
      res.send({ code: 500, msg: err });
    });
};

module.exports = {
  getAditional,
  postAditional,
  pullAditional,
};
