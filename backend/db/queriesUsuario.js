require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

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

signup = async (req, res) => {
  const data = {
    telefono: req.body.telefono,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    contrasena: await bcrypt.hash(req.body.contrasena, 10),
    admin: false
  };
  await Usuarios.create(data)
    .then(response => {
      console.log(response);
      res.send({ code: '200', msg: '¡Usuario creado con éxito! :)' });
    })
    .catch(err => {
      console.log('error:...', err.message);
      if (err.code === 11000) {
        res.send({
          code: '401',
          msg:
            'El Usuario con ese número de teléfono ya existe en la base de datos'
        });
      } else {
        res.send({ code: '500', msg: 'Error de servidor' });
      }
    });
};

login = async (req, res) => {
  const { telefono, contrasena } = req.body;
  await Usuarios.findOne({ telefono })
    .then(data => {
      if (!bcrypt.compare(contrasena, data.contrasena)) {
        res.send({ code: '402', msg: 'Usuario o contraseña incorrecto' });
      } else {
        const secretKey = process.env.KEY;
        const token = jwt.sign({ id: data._id }, secretKey);
        res.send({
          code: '200',
          msg: 'Sesión iniciada correctamente',
          token,
          id: data._id
        });
      }
    })
    .catch(err => {
      res.send({ code: '404', msg: 'Usuario o contraseña incorrecto' });
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  postUser,
  pullUser,
  deleteUser,
  login,
  signup
};
