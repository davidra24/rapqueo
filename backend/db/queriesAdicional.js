const connection = require("./mysqlconnect");

require("dotenv/config");

getAditional = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM aditional WHERE id=?",
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

postAditional = (req, res) => {
  const { price } = req.body;
  let mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE aditional SET active=0 WHERE active=1",
    (err, rows, fields) => {}
  );
  mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO aditional (price, active) VALUES(? , 1)",
    [price],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Inserted" });
      } else {
        console.log(err);
      }
    }
  );
};

putAditional = (req, res) => {
  const { price } = req.body;
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE aditional SET price=? WHERE id=?",
    [price, id],
    (err, rows, fieds) => {
      if (!err) {
        res.json({ Status: "Actualizado" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getAditional,
  postAditional,
  putAditional,
};
