const connection = require("./mysqlconnect");
require("dotenv/config");

getAllDirections = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM directions", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

getDirectionsByUser = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM directions WHERE id_user=?",
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

getOneDirection = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM directions WHERE id=?",
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
postDirection = (req, res) => {
  const { neighborhood, direction, id_user } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO directions (neighborhood, direction, id_user) VALUES(?, ?, ?)",
    [neighborhood, direction, id_user],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

pullDirection = (req, res) => {
  const { neighborhood, direction, id_user } = req.body;
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE directions SET(neighborhood=?, direction=?, id_user=?) WHERE id=?",
    [neighborhood, direction, id_user, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Direccion actualizada" });
      } else {
        console.log(err);
      }
    }
  );
};

deleteDirection = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "DELETE FROM directions WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Direccion eliminada" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getAllDirections,
  getOneDirection,
  getDirectionsByUser,
  postDirection,
  pullDirection,
  deleteDirection,
};
