require('dotenv/config');

const webpush = require('web-push');
const Pedidos = require('../models/Pedidos');
const Usuarios = require('../models/Usuarios');
const Productos = require('../models/Productos');

webpush.setVapidDetails(
  'mailto:mercachevere0@gmail.com',
  process.env.PUBLIC_KEY,
  process.env.PRIVATE_KEY
);

getAllOrders = (req, res) => {
  Pedidos.find().then((data) => {
    res.send(data);
  });
};

getOrdersByUser = (req, res) => {
  const id = req.params.id;
  Pedidos.find({ id_usuario: id }).then((data) => {
    res.send(data);
  });
};

getOneOrder = (req, res) => {
  const id = req.params.id;
  Pedidos.findById(id).then((data) => {
    res.send(data);
  });
};

postOrder = async (req, res) => {
  const user = await Usuarios.find({ admin: true });
  await updatePorducts(req.body.productos);
  await Pedidos.create(req.body)
    .then(async (data) => {
      const info = {
        message: 'Se ha realizado un pedido',
        url: `/pedido/${data._id}`,
        id: data._id,
      };
      user.forEach(async (us) => {
        console.log('user');
        await us.displayNotifications.forEach(async (notification) => {
          await sendNotification(notification, info);
        });
      });
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
};

updateStateOrder = async (req, res) => {
  const { body } = req;
  const user = await Usuarios.findOne({ _id: body.id_usuario });
  const estado =
    parseInt(body.estado) === 0
      ? 'Pendiente'
      : state.order.estado === 1
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
  Pedidos.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {}).then(
    (data) => {
      res.send(data);
    }
  );
};

deleteOrder = (req, res) => {
  Pedidos.findOneAndRemove(req.params.id).then((data) => {
    res.send(data);
  });
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
    });
  });
};

module.exports = {
  getAllOrders,
  getOneOrder,
  getOrdersByUser,
  postOrder,
  pullOrder,
  deleteOrder,
  updateStateOrder,
};
