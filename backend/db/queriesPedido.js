const mySQLConnection=require('./mysqlconnect');
require('dotenv/config');

const webpush = require('web-push');
const Pedidos = require('../models/Pedidos');
const Usuarios = require('../models/Usuarios');
const Productos = require('../models/Productos');
const Promos = require('../models/Promociones');

webpush.setVapidDetails(
  'mailto:mercachevere0@gmail.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

getAllOrders = (req, res) => {
  mySQLConnection.query('SELECT * FROM orders',(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getOrdersByUser = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('SELECT * FROM order_user WHERE id_user=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getOrdersByState = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('SELECT * FROM orders WHERE state=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

getOneOrder = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('SELECT * FROM orders WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json(rows);
    }else{
      console.log(err);
    }
  })
};

postOrder = async (req, res) => {
  const { productos } = req.body;
  let existencia = true;
  let msg = 'No hay existencia en el momento de los siguientes productos: \n';
  await productos.forEach((producto) => {
    Productos.findById(producto.id).then((response) => {
      if (response.caracteristicas.cantidad < producto.cantidad) {
        existencia = false;
        msg += `${producto.nombre}, por favor, pida ${response.caracteristicas.cantidad} cantidades o menos \n`;
      }
    });
    msg += '.';
  });
  if (!existencia) {
    res.send({
      code: 304,
      msg,
      data: null,
    });
  } else {
    const user = await Usuarios.find({ admin: true });
    await Pedidos.create(req.body)
      .then(async (data) => {
        const info = {
          message: 'Se ha realizado un pedido',
          url: `/pedido/${data._id}`,
          id: data._id,
        };
        user.forEach(async (us) => {
          await us.displayNotifications.forEach(async (notification) => {
            await sendNotification(notification, info);
          });
        });
        await updatePorducts(req.body.productos);
        res.send({
          code: 200,
          msg: 'Pedido realizado exitosamente',
          data,
        });
      })
      .catch((err) => {
        res.send({
          code: 500,
          msg: err,
        });
      });
  }
};

updateStateOrder = async (req, res) => {
  const { body } = req;
  const user = await Usuarios.findOne({ _id: body.id_usuario });
  const estado =
    parseInt(body.estado) === 0
      ? 'Pendiente'
      : body.estado === 1
      ? 'En proceso'
      : 'Entregado';
  await Pedidos.updateOne({ _id: body._id }, body)
    .then(() => {
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
        msg: 'Estado actualizado satisfactoriamente',
        body,
      });
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: err,
      });
    });
};

pullOrder = (req, res) => {
  const { date, state, aditional }=req.body;
  const { id } = req.params;
  mySQLConnection.query('UPDATE orders SET(date=?, state=?, aditional=?) WHERE id=?',[date, state, aditional, id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Orden actualizada'});
    }else{
      console.log(err);
    }
  })
};

deleteOrder = (req, res) => {
  const { id } = req.params;
  mySQLConnection.query('DELETE FROM orders WHERE id=?',[id],(err, rows, fields)=>{
    if(!err){
      res.json({Status: 'Orden eliminada'});
    }else{
      console.log(err);
    }
  })
};

const sendNotification = async (notification, body) => {
  const { message, url, id } = body;
  const payload = JSON.stringify({
    title: 'Mercar Chevere',
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

const updatePorducts = async (products) => {
  return await products.map(async (producto) => {
    return await Productos.findByIdAndUpdate(producto.id, {
      $inc: { 'caracteristicas.cantidad': -producto.cantidad },
    }).then((response) => {
      updatePromos(response).then((response) => 'ok');
    });
  });
};

const updatePromos = async (producto) => {
  const { _id } = producto;
  await Promos.findOneAndUpdate({ 'producto._id': _id }, { producto });
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
