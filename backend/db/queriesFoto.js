const connection = require("./mysqlconnect");

require("dotenv/config");

getPhoto = (req, res) => {
  const mySQLConnection = connection();
  const { id } = req.params;
  mySQLConnection.query(
    "SELECT * FROM photos WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
        mySQLConnection.end();
      } else {
        console.log(err);
      }
    }
  );
};

postPhoto = (req, res) => {
  const mySQLConnection = connection();
  const { image, description } = req.body;
  mySQLConnection.query(
    "INSERT INTO photos (image,description) VALUES(?,?)",
    [image, description],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Foto agregada" });
      } else {
        console.log(err);
      }
    }
  );
};

putPhoto = (req, res) => {
  const mySQLConnection = connection();
  const { image, description } = req.body;
  const { id } = req.params;
  mySQLConnection.query(
    "UPDATE photos SET image=?, description=? WHERE id=?",
    [image, description, id],
    (err, rows, fieds) => {
      if (!err) {
        res.json({ Status: "Actualizado" });
      } else {
        console.log(err);
      }
    }
  );
};

deletePhoto = (req, res) => {
  const mySQLConnection = connection();
  const { id } = req.params;
  mySQLConnection.query(
    "DELETE FROM photos WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Eliminado" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getPhoto,
  postPhoto,
  putPhoto,
  deletePhoto,
};
