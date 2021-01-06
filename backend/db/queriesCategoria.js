const connection = require("./mysqlconnect");

require("dotenv/config");

getAllCategories = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM categories", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

getOneCategorie = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM categories WHERE id=?",
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

postCategorie = (req, res) => {
  const { name, id_photo, subcategorie } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO categories (name, id_photo, subcategorie) VALUES(?,?,?)",
    [name, id_photo, subcategorie],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Categoria agregada" });
      } else {
        console.log(err);
      }
    }
  );
};

pullCategorie = (req, res) => {
  const { name, id_photo, subcategorie } = req.body;
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE categories SET name=?, id_photo=?, subcategorie=? WHERE id=?",
    [name, id_photo, subcategorie, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Categoria actualizada" });
      } else {
        console.log(err);
      }
    }
  );
};

deleteCategorie = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "DELETE FROM categories WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Categoria eliminada" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getAllCategories,
  getOneCategorie,
  postCategorie,
  pullCategorie,
  deleteCategorie,
};
