const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Codigos = require('../models/Codigos');
const Usuarios = require('../models/Usuarios');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

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

getUserByPhone = (req, res) => {
  const telefono = req.body.telefono;
  Usuarios.findOne({ telefono })
    .then((data) => {
      if (data) {
        res.send({ code: 200, data });
      } else {
        res.send({ code: 404, msg: 'Usuario no existente' });
      }
    })
    .catch((err) => {
      res.send({ code: 404, msg: 'Usuario no existente' });
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
          mensajero: data.mensajero,
        },
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.send({
          code: 401,
          msg: 'El Usuario con ese correo electrónico ya existe en el sistema',
        });
      } else {
        res.send({ code: 500, msg: 'Error de servidor' });
      }
    });
};

deleteUser = (req, res) => {
  Usuarios.findByIdAndRemove(req.params.id).then((data) => {
    res.send(data);
  });
};

signup = async (req, res) => {
  const body = {
    ...req.body,
    contrasena: await bcrypt.hash(req.body.contrasena, 10),
  };
  await Usuarios.create(body)
    .then((data) => {
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
      if (err.code === 11000) {
        res.send({
          code: 401,
          msg:
            'El Usuario con ese número de teléfono o correo electrónico ya existe en la base de datos',
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
          res.send({ code: 402, msg: 'Teléfono o contraseña incorrecto' });
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
              correo: data.correo,
              mensajero: data.mensajero,
            },
          });
        }
      });
    })
    .catch((err) => {
      res.send({ code: 404, msg: 'Teléfono o contraseña incorrecto' });
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
      res.send({
        code: 404,
        msg: 'La contraseña antigua es incorrecta, por favor verifíquela',
      });
    });
};

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

forgotPassword = async (req, res) => {
  const { email } = req.body;
  const codigo = makeid(6);
  await Usuarios.findOne({ correo: email })
    .then(async (usuario) => {
      if (!usuario) {
        res.send({ code: 501, msg: 'Correo no existente' });
      }
      const { correo } = usuario;
      contentHTML = `
        <h1>Mercarchevere.com</h1>
        <strong>
        <p>🥳 Bienvenido a mercarchevere.com </p>
        <p>🤖 Como no queremos que te quedes sin utilizar nuestros servicios</p>
        </strong>
        <p>🤫 Te enviamos el siguiente Código de restauración para tu cuenta.</p>
        <p>😎 Disfruta tus compras </p>
        <br/>
        <br/>
        <p>🤯 Tu código es</p>
        <h3>${codigo}</h3>
      `;

      const options = {
        host: 'mail.mercarchevere.com.co',
        port: 587,
        secure: false,
        auth: {
          user: 'info@mercarchevere.com.co',
          pass: 'mercarchevere.com.co',
        },
        tls: {
          rejectUnauthorized: false,
        },
      };

      const transporter = await nodemailer.createTransport(
        smtpTransport(options)
      );

      await transporter
        .sendMail({
          from: '📲🛒 MercarChevere <info@mercarchevere.com.co>',
          to: email,
          subject: '🔑 ¡Recupera tu contraseña!',
          html: contentHTML,
        })
        .then((response) => {
          console.log('mail sended', response.messageId);
          Codigos.create({
            correo,
            codigo,
            expiracion: getExpiration(),
          }).then((response) => {
            res.send({ code: 200, msg: 'Ok' });
          });
        })
        .catch((err) => {
          res.send({
            code: 500,
            msg: 'Error de conexión con el servidor de correo',
          });
        });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: 'Error de conexión con el servidor de correo',
      });
    });
};

codeRecovery = async (req, res) => {
  const { codigo, correo } = req.body;
  await Codigos.findOne({ codigo, correo })
    .then(async (response) => {
      if (response) {
        var valido = false;
        const { _id, utilizado, expiracion } = response;
        if (!utilizado && compareDates(expiracion)) {
          valido = true;
          await Codigos.findByIdAndUpdate(_id, { utilizado: true }).then(
            (response) => {
              res.send({
                code: 200,
                msg: 'Se ha comprobado el código exitosamente',
                data: response,
              });
            }
          );
          return;
        }
        if (!valido) {
          res.send({
            code: 500,
            msg: 'El código proporcionado no es correcto o ha expirado',
          });
        }
      } else {
        res.send({
          code: 500,
          msg: 'El código proporcionado no es correcto',
        });
      }
    })
    .catch((err) => {
      res.send({ code: 500, msg: 'El código proporcionado no es correcto' });
    });
};

function compareDates(date) {
  return new Date().getTime() < new Date(date).getTime();
}

function getExpiration() {
  const date = new Date();
  const diff = 15;
  const newDate = date.getTime() + diff * 60000;
  return newDate;
}

recoveryPassword = async (req, res) => {
  const { correo } = req.body;
  const contrasena = await bcrypt.hash(req.body.contrasena, 10);
  await Usuarios.findOneAndUpdate({ correo }, { contrasena })
    .then((response) => {
      res.send({
        code: 200,
        msg: 'Su contraseña se ha actualizado con éxito, puede iniciar sesión',
        respuesta: response,
      });
    })
    .catch((err) => {
      res.send({ code: 500, msg: 'No se ha podido cambiar la contraseña' });
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
  forgotPassword,
  codeRecovery,
  recoveryPassword,
  getUserByPhone,
};
