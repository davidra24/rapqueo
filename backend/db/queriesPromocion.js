const mySQLConnection=require('./mysqlconnect');
require('dotenv/config');

getAllPromos = (req, res) => {
  mySQLConnection.query('SELECT * FROM promos',(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};
getFilteredPromos = (req, res) => {
  const today = new Date();
  mySQLConnection.query('SELECT * FROM promos',(err, rows, fields)=>{
    if(!err){
      const filtered = rows.filter(
        (promo) =>
          promo.fechaInicio.getTime() <= today.getTime() &&
          promo.fechaFin.getTime() >= today.getTime() &&
          promo.producto.caracteristicas.cantidad
      );
      res.json(filtered);
    }else{
      console.log(err);
    }
  })
};

getOnePromo = (req, res) => {
  const id = req.params;
  mySQLConnection.query('SELECT * FROM promos WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

postPromo = async (req, res) => {
  const { fechaInicio, fechaFin, message, percentaje, id_product }=req.body;
  mySQLConnection.query('INSERT INTO promos (fechaInicio, fechaFin, message, percentaje, id_product) values(?, ?, ?, ?, ?) ',[fechaInicio, fechaFin, message, percentaje, id_product],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Promocion añadida'});
    }else{
      console.log(err);
    }
  })
};

pullPromo = (req, res) => {
  const { fechaInicio, fechaFin, message, percentaje, id_product }=req.body;
  const { id } = req.params;
  mySQLConnection.query('UPDATE promos SET(fechaInicio=?, fechaFin=?, message=?, percentaje=?, id_product=?) WHERE id=?',[fechaInicio, fechaFin, message, percentaje, id_product, id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Promocion actualizada'});
    }else{
      console.log(err);
    }
  })
};

deletePromo = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('DELETE FROM promos WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Promocion eliminada'});
    }else{
      console.log(err);
    }
  })
};

module.exports = {
  getAllPromos,
  getFilteredPromos,
  getOnePromo,
  postPromo,
  pullPromo,
  deletePromo,
};
