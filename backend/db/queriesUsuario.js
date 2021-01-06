const connection = require("./mysqlconnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

getAllUsers = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

getOneUser = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM users WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    }
  );
};

getUserByPhone = (req, res) => {
  const telefono = req.body.telefono;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM users WHERE phone=?",
    [telefono],
    (err, rows, fields) => {
      if (!err) {
        res.send({ code: 200, rows });
      } else {
        res.send({ code: 404, msg: "Usuario no existente" });
      }
    }
  );
};

postUser = (req, res) => {
  const {
    name,
    lastname,
    phone,
    email,
    password,
    direction,
    admin,
    deliver,
    displayNotification,
  } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO users (name, lastname, phone, email, password, direction, admin, deliver, displayNotifications) VALUES(?, ? ,? ,?, ?, ?, ?, ?, ? )",
    [
      name,
      lastname,
      phone,
      email,
      password,
      direction,
      admin,
      deliver,
      displayNotification,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

putUser = async (req, res) => {
  if (req.body.password) {
    const contrasena = bcrypt.hashSync(req.body.password, 10);
    var body = { ...req.body, contrasena };
  } else {
    var body = req.body;
  }
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE users SET name=?, lastname=?, phone=?, email=?, password=?, direction=?, admin=?, deliver=?, displayNotifications=? WHERE id=?",
    [
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.contrasena,
      body.direction,
      body.admin,
      body.deliver,
      body.displayNotification,
      body.id,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          code: 200,
          msg: "Se han actualizado los datos personales satisfactoriamente",
        });
      } else {
        res.send({ code: 500, msg: "Error de servidor" });
      }
    }
  );
};

deleteUser = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "DELETE FROM users WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Usuario eliminado" });
      } else {
        console.log(err);
      }
    }
  );
};

signup = async (req, res) => {
  const body = {
    ...req.body,
    contrasena: await bcrypt.hash(req.body.password, 10),
  };
  const mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO users (name, lastname, phone, email, password, direction, admin, deliver, displayNotifications) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      body.name,
      body.lastname,
      body.phone,
      body.email,
      body.contrasena,
      body.direction,
      body.admin,
      body.deliver,
      body.displayNotification,
    ],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          code: 200,
          msg: "¡Usuario creado con éxito! :)",
        });
      } else {
        res.send({ code: 500, msg: "Error de servidor: " + err });
      }
    }
  );
};

login = async (req, res) => {
  const { telefono, contrasena } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * from users WHERE phone=?",
    [telefono],
    (err, rows, fields) => {
      if (!err) {
        bcrypt.compare(contrasena, rows[0].password).then((result) => {
          if (!result) {
            res.send({ code: 402, msg: "Teléfono o contraseña incorrecto" });
          } else {
            const secretKey = process.env.KEY;
            const token = jwt.sign({ id: rows[0].id }, secretKey);
            res.send({
              code: 200,
              msg: "Sesión iniciada correctamente",
              token,
              data: {
                id: rows[0].id,
                phone: rows[0].phone,
                name: rows[0].name,
                lastname: rows[0].lastname,
                admin: rows[0].admin,
                email: rows[0].email,
                deliver: rows[0].deliver,
              },
            });
          }
        });
      } else {
        res.send({ code: 404, msg: "Teléfono o contraseña incorrecto" });
      }
    }
  );
};

verifyPassword = async (req, res) => {
  const { telefono, contrasena } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM users WHERE phone=?",
    [telefono],
    (err, rows, fields) => {
      bcrypt.compare(contrasena, rows[0].password).then((result) => {
        if (!result) {
          res.send({
            code: 402,
            msg: "La contraseña antigua es incorrecta, por favor verifíquela",
          });
        } else {
          res.send({
            code: 200,
            msg: "Correcto",
          });
        }
      });
    }
  );
};

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

forgotPassword = async (req, res) => {
  const { email } = req.body;
  const codigo = makeid(6);
  let mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM users where email=?",
    [email],
    (err, rows, fields) => {
      if (!rows) {
        res.send({ code: 501, msg: "Correo no existente" });
      }
      const { correo } = rows[0].email;
      const { idUser } = rows[0].id;
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
        host: "mail.mercarchevere.com",
        port: 587,
        secure: false,
        auth: {
          user: "info@mercarchevere.com",
          pass: "mercarchevere.com",
        },
        tls: {
          rejectUnauthorized: false,
        },
      };

      const transporter = nodemailer.createTransport(smtpTransport(options));

      transporter
        .sendMail({
          from: "📲🛒 MercarChevere <info@mercarchevere.com>",
          to: email,
          subject: "🔑 ¡Recupera tu contraseña!",
          html: contentHTML,
        })
        .then((response) => {
          console.log("mail sended", response.messageId);
          mySQLConnection = connection();
          mySQLConnection.query(
            "INSERT INTO recuperation_codes (code, used, expiration, id_user) VALUES(?, 0, ?, ?)",
            [codigo, getExpiration(), idUser],
            (err, rows, fields) => {
              if (!err) {
                res.send({ code: 200, msg: "Ok" });
              } else {
                res.send({
                  code: 500,
                  msg: "Error de conexión con el servidor de correo",
                });
              }
            }
          );
        });
    }
  );
};

codeRecovery = async (req, res) => {
  const { codigo, correo } = req.body;
  let mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM recuperation_codes WHERE code=? AND email=?",
    [codigo, correo],
    (err, rows, fields) => {
      if (!err) {
        var valido = false;
        if (rows[0].used == 0 && compareDates(rows[0].expiration)) {
          valido = true;
          mySQLConnection = connection();
          mySQLConnection.query(
            "UPDATE recuperation_codes SET used=1 WHERE id=?",
            [rows[0].id],
            (err, rows, fields) => {
              (response) => {
                res.send({
                  code: 200,
                  msg: "Se ha comprobado el código exitosamente",
                  data: response,
                });
              };
            }
          );
          return;
        }
        if (!valido) {
          res.send({
            code: 500,
            msg: "El código proporcionado no es correcto o ha expirado",
          });
        }
      } else {
        res.send({
          code: 500,
          msg: "El código proporcionado no es correcto",
        });
      }
    }
  );
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
  const contrasena = await bcrypt.hash(req.body.password, 10);
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE users SET password=? WHERE email=?",
    [contrasena, correo],
    (err, rows, fields) => {
      if (!err) {
        res.send({
          code: 200,
          msg:
            "Su contraseña se ha actualizado con éxito, puede iniciar sesión",
          respuesta: response,
        });
      } else {
        res.send({ code: 500, msg: "No se ha podido cambiar la contraseña" });
      }
    }
  );
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
