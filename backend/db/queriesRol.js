require('dotenv/config');

const Roles = require('../models/Roles');

getAllRoles = (req, res) => {
  Roles.find().then(data => {
    res.send(data);
  });
};

getOneRole = (req, res) => {
  const id = req.params._id;
  Roles.findById(id).then(data => {
    res.send(data);
  });
};

postRole = (req, res) => {
  Roles.create(req.body).then(data => {
    res.send(data);
  });
};

pullRole = (req, res) => {
  Roles.findByIdAndUpdate(
    req.params._id,
    req.body,
    (err, todo) => {}
  ).then(data => {
    res.send(data);
  });
};

deleteRole = (req, res) => {
  Roles.findOneAndRemove(req.params._id).then(data => {
    res.send(data);
  });
};

module.exports = {
  getAllRoles,
  getOneRole,
  postRole,
  pullRole,
  deleteRole
};
