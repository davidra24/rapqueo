const mySQLConnection=require('./mysqlconnect');

require('dotenv/config');

getAllRecuperationCodes = (req, res) => {
  mySQLConnection.query('SELECT * FROM recuperation_codes', (err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getOneRecuperationCode = (req, res) => {
  const { id }=req.params;
  mySQLConnection.query('SELECT * FROM recuperation_codes WHERE id=?',[id], (err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};
 
postRecuperationCode = (req, res) => {
  const{ code, used, expiration, id_user }=req.body;
  mySQLConnection.query('INSERT INTO recuperation_codes (code, used, expiration, id_user) VALUES(?, ?, ?, ?)',[code, used, expiration, id_user],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Codigo agregado'});
    } else{
      console.log(err);
    }
  })
};

pullRecuperationCode = (req, res) => {
  const { code, used, expiration, id_user } = req.body;
  const { id } = req.params;
  mySQLConnection.query('UPDATE recuperation_codes SET code=?, used=?, expiration=?, id_user=? WHERE id=?',[code, used, expiration, id_user, id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Codigo actualizado'});
    } else{
      console.log(err);
    }
  })
};

deleteRecuperationCode = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('DELETE FROM recuperation_codes WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Codigo eliminado'});
    }else{
      console.log(err);
    }
  })
};

module.exports = {
  getAllRecuperationCodes,
  getOneRecuperationCode,
  postRecuperationCode,
  pullRecuperationCode,
  deleteRecuperationCode,
};
