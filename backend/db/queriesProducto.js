const connection = require("./mysqlconnect");
require("dotenv/config");

getAllProducts = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM products", (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
};

getAllProductsWithoutPromo = async (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query("SELECT * FROM promos", (err, rows, fields) => {
    if (!err) {
      async (rows) => {
        const mySQLConnection = connection();
        mySQLConnection.query("SELECT * FROM products", (err, rows, fieds) => {
          if (!err) {
            async (productos) => {
              let arr = [];
              for (let i = 0; i < productos.length; i++) {
                let existe = false;
                for (let j = 0; j < rows.length; j++) {
                  const str1 = rows[j].idProduct.toString();
                  const str2 = productos[i].id.toString();
                  if (str1.trim() === str2.trim()) {
                    existe = true;
                  }
                }
                if (!existe) {
                  arr.push(productos[i]);
                }
              }
              res.send(arr);
            };
          }
        });
      };
    } else {
      res.send({ code: 500, msg: "Error al consultar promociones" });
    }
  });
};

getProductWithoutCategorie = (req, res) => {
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM products WHERE id_categorie=null",
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
};

getOneProduct = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM products WHERE id=?",
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

getProductsByCategorie = (req, res) => {
  const id = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "SELECT * FROM products WHERE id_categorie=?",
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

postProduct = (req, res) => {
  const { name, caracteristics, id_photo, id_categorie } = req.body;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "INSERT INTO products (name, caracteristics, id_photo, id_categorie) VALUES(?,?,?,?)",
    [name, JSON.stringify(caracteristics), id_photo, id_categorie],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Producto añadido" });
      } else {
        console.log(err);
      }
    }
  );
};

pullProduct = (req, res) => {
  const { name, caracteristics, id_photo, id_categorie } = req.body;
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "UPDATE products SET name=?, caracteristics=?, id_photo=?, id_categorie=? WHERE id=?",
    [name, caracteristics, id_photo, id_categorie, id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Producto actualizado" });
      } else {
        console.log(err);
      }
    }
  );
};

deleteProduct = (req, res) => {
  const { id } = req.params;
  const mySQLConnection = connection();
  mySQLConnection.query(
    "DELETE FROM products WHERE id=?",
    [id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ Status: "Producto eliminado" });
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  getAllProducts,
  getOneProduct,
  getProductsByCategorie,
  getProductWithoutCategorie,
  getAllProductsWithoutPromo,
  postProduct,
  pullProduct,
  deleteProduct,
};
