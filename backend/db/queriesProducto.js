const mySQLConnection=require('./mysqlconnect');
require('dotenv/config');

const Productos = require('../models/Productos');
const Promos = require('../models/Promociones');

getAllProducts = (req, res) => {
  mySQLConnection.query('SELECT * FROM products',(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getAllProductsWithoutPromo = async (req, res) => {
  await Promos.find()
    .then(async (promos) => {
      await Productos.find().then(async (productos) => {
        let arr = [];
        for (let i = 0; i < productos.length; i++) {
          let existe = false;
          for (let j = 0; j < promos.length; j++) {
            const str1 = promos[j].producto._id.toString();
            const str2 = productos[i]._id.toString();
            if (str1.trim() === str2.trim()) {
              existe = true;
            }
          }
          if (!existe) {
            arr.push(productos[i]);
          }
        }
        res.send(arr);
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({ code: 500, msg: 'Error al consultar promociones' });
    });
};

getProductWithoutCategorie = (req, res) => {
  mySQLConnection.query('SELECT * FROM products WHERE id_categorie=null',(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getOneProduct = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('SELECT * FROM products WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getProductsByCategorie = (req, res) => {
  const id = req.params;
  mySQLConnection.query('SELECT * FROM products WHERE id_categorie=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

postProduct = (req, res) => {
  const { name, caracteristics, id_photo, id_categorie } = req.body;
  mySQLConnection.query('INSERT INTO products (name, caracteristics, id_photo, id_categorie) VALUES(?,?,?,?)',[name, caracteristics, id_photo, id_categorie],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Producto añadido'});
    } else{
      console.log(err);
    }
  })
};

pullProduct = (req, res) => {
  const { name, caracteristics, id_photo, id_categorie } = req.body;
  const { id } = req.params;
  mySQLConnection.query('UPDATE products SET name=?, caracteristics=?, id_photo=?, id_categorie=? WHERE id=?',[name, caracteristics, id_photo, id_categorie, id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Producto actualizado'});
    } else{
      console.log(err);
    }
  })
};

deleteProduct = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('DELETE FROM products WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Producto eliminado'});
    } else{
      console.log(err);
    }
  })
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
