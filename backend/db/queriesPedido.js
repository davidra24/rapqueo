const connection = require("./mysqlconnect");
require("dotenv/config");

const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:mercachevere0@gmail.com",
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

getAllOrders = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM orders", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

getOrdersByUser = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM order_user WHERE id_user=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

getOrdersByState = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM orders WHERE state=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

getOneOrder = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM orders WHERE id=?",
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

postOrder = async (req, res) => {
  const { productos } = req.body;
  let existencia = true;
  let msg = "No hay existencia en el momento de los siguientes productos: \n";
  await productos.forEach((producto) => {
    const mySQLConnection = connection();
    mySQLConnection.query(
      "SELECT * FROM products WHERE id=?",
      [producto.id],
      (err, rows, fields) => {
        if (rows.caracteristicas.cantidad < producto.cantidad) {
          existencia = false;
          msg += `${producto.nombre}, por favor, pida ${rows.caracteristicas.cantidad} cantidades o menos \n`;
        }
      }
    );
  });
  if (!existencia) {
    res.send({
      code: 304,
      msg,
      data: null,
    });
  } else {
    let mySQLConnection = connection();
    mySQLConnection.query(
      "SELECT * FROM users WHERE admin=1",
      (err, rows, fields) => {
        const user = rows;
      }
    );
    mySQLConnection = connection();
    mySQLConnection.query(
      "SELECT id FROM orders WHERE latest=1",
      (err, rows, fields) => {
        const idOrder = rows;
      }
    );
    mySQLConnection = connection();
    mySQLConnection.query(
      "INSERT INTO orders (date, state, aditional) VALUES(?, ?, (SELECT id FROM aditional WHERE active=1))",
      [now(), 0],
      (err, rows, fields) => {
        if (!err) {
          const info = {
            message: "Se ha realizado un pedido",
            url: `/pedido/${rows.id}`,
            id: rows.id,
          };
          user.forEach(async (us) => {
            await us.displayNotifications.forEach(async (notification) => {
              await sendNotification(notification, info);
            });
          });
        } else {
          res.send({
            code: 500,
            msg: err,
          });
        }
      }
    );
    await productos.forEach((producto) => {
      const mySQLConnection = connection();
      mySQLConnection.query(
        "INSERT INTO orders_products (id_order, id_product, cantidad) VALUES(?, ?, ?)",
        [idOrder, producto.id, producto.cantidad],
        (err, rows, fields) => {
          if (!err) {
            const mySQLConnection = connection();
            mySQLConnection.query(
              "SELECT * FROM products WHERE id=?",
              [producto.id],
              (err, rows, fields) => {
                const mySQLConnection = connection();
                mySQLConnection.query(
                  "UPDATE products SET caracteristicas.cantidad=? WHERE id=?",
                  [rows.caracteristicas.cantidad - producto.cantidad, id],
                  (err, rows, fields) => {
                    if (!err) {
                      res.send({
                        code: 200,
                        msg: "Pedido realizado exitosamente",
                        rows,
                      });
                    } else {
                      res.send({
                        code: 500,
                        msg: err,
                      });
                    }
                  }
                );
              }
            );
          } else {
            res.send({
              code: 500,
              msg: err,
            });
          }
        }
      );
    });
  }
};

updateStateOrder = async (req, res) => {
  const { body } = req;
  let mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM users WHERE id=?",
    [body._id],
    (err, rows, fields) => {
      const user = rows;
    }
  );
  const estado =
    parseInt(body.estado) === 0
      ? "Pendiente"
      : body.estado === 1
      ? "En proceso"
      : "Entregado";
  mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE orders SET state=? WHERE id=?",
    [body.estado, body._id],
    (err, rows, fields) => {
      if (!err) {
        const info = {
          message: `Su pedido se encuentra en estado ${estado}`,
          url: `/pedido/${body._id}`,
          id: body._id,
        };
        user.displayNotifications.forEach(async (notification) => {
          await sendNotification(notification, info);
        });
        res.send({
          code: 200,
          msg: "Estado actualizado satisfactoriamente",
          body,
        });
      } else {
        res.send({
          code: 500,
          msg: err,
        });
      }
    }
  );
};

pullOrder = (req, res) => {
  const { date, state, aditional } = req.body;
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE orders SET(date=?, state=?, aditional=?) WHERE id=?",
    [date, state, aditional, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Orden actualizada" });
      } else {
        console.log(err);
      }
    }
  );
};

deleteOrder = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "DELETE FROM orders WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Orden eliminada" });
      } else {
        console.log(err);
      }
    }
  );
};

const sendNotification = async (notification, body) => {
  const { message, url, id } = body;
  const payload = JSON.stringify({
    title: "Mercar Chevere",
    message: {
      message,
      url,
      id,
    },
  });
  try {
    await webpush.sendNotification(notification, payload);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  getOrdersByUser,
  getOrdersByState,
  postOrder,
  pullOrder,
  deleteOrder,
  updateStateOrder,
};
