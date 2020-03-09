require("dotenv/config");

const Usuarios = require("../models/Usuarios");

getAllUsers = (req, res) => {
  Usuarios.find().then(data => {
    res.send(data);
  });
};

getOneUser = (req, res) => {
  const id = req.params.id;
  Usuarios.findById(id).then(data => {
    res.send(data);
  });
};

postUser = (req, res) => {
  Usuarios.create(req.body).then(data => {
    res.send(data);
  });
};

pullUser = (req, res) => {
  Usuarios.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(
    data => {
      res.send(data);
    }
  );
};

deleteUser = (req, res) => {
  Usuarios.findOneAndRemove(req.params.id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  postUser,
  pullUser,
  deleteUser
};
