require('dotenv/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

getAllUsers = (req, res) => {
  Usuarios.find().then((data) => {
    res.send(data);
  });
};

getOneUser = (req, res) => {
  const id = req.params.id;
  Usuarios.findById(id).then((data) => {
    res.send(data);
  });
};

postUser = (req, res) => {
  Usuarios.create(req.body).then((data) => {
    res.send(data);
  });
};

putUser = async (req, res) => {
  if (req.body.contrasena) {
    const contrasena = await bcrypt.hash(req.body.contrasena, 10);
    var body = { ...req.body, contrasena };
  } else {
    var body = req.body;
  }
  await Usuarios.findByIdAndUpdate(req.params.id, body)
    .then((data) => {
      res.send({
        code: 200,
        msg: 'Se han actualizado los datos personales satisfactoriamente',
        data: {
          id: data._id,
          telefono: data.telefono,
          nombre: data.nombre,
          apellido: data.apellido,
          admin: data.admin,
          direccion: data.direccion ? data.direccion : null,
        },
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: 'No se han podido actualizar los datos personales',
      });
    });
};

deleteUser = (req, res) => {
  Usuarios.findByIdAndRemove(req.params.id).then((data) => {
    res.send(data);
  });
};

signup = async (req, res) => {
  const data = {
    telefono: req.body.telefono,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    contrasena: await bcrypt.hash(req.body.contrasena, 10),
    admin: false,
  };
  await Usuarios.create(data)
    .then((data) => {
      console.log(data);
      res.send({
        code: 200,
        msg: '¡Usuario creado con éxito! :)',
        data: {
          telefono: req.body.telefono,
          contrasena: req.body.contrasena,
        },
      });
    })
    .catch((err) => {
      console.log('error:...', err.message);
      if (err.code === 11000) {
        res.send({
          code: 401,
          msg:
            'El Usuario con ese número de teléfono ya existe en la base de datos',
        });
      } else {
        res.send({ code: 500, msg: 'Error de servidor' });
      }
    });
};

login = async (req, res) => {
  const { telefono, contrasena } = req.body;
  await Usuarios.findOne({ telefono })
    .then((data) => {
      bcrypt.compare(contrasena, data.contrasena).then((result) => {
        if (!result) {
          res.send({ code: 402, msg: 'Usuario o contraseña incorrecto' });
        } else {
          const secretKey = process.env.KEY;
          const token = jwt.sign({ id: data._id }, secretKey);
          res.send({
            code: 200,
            msg: 'Sesión iniciada correctamente',
            token,
            data: {
              id: data._id,
              telefono: data.telefono,
              nombre: data.nombre,
              apellido: data.apellido,
              admin: data.admin,
              foto: data.foto ? data.foto : null,
              direccion: data.direccion ? data.direccion : null,
            },
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ code: 404, msg: 'Usuario o contraseña incorrecto' });
    });
};

verifyPassword = async (req, res) => {
  const { telefono, contrasena } = req.body;
  await Usuarios.findOne({ telefono })
    .then((data) => {
      bcrypt.compare(contrasena, data.contrasena).then((result) => {
        if (!result) {
          res.send({
            code: 402,
            msg: 'La contraseña antigua es incorrecta, por favor verifíquela',
          });
        } else {
          res.send({
            code: 200,
            msg: 'Correcto',
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        code: 404,
        msg: 'La contraseña antigua es incorrecta, por favor verifíquela',
      });
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  postUser,
  putUser,
  deleteUser,
  login,
  signup,
  verifyPassword,
};
