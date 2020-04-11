const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedido = new Schema({
  telefono: String,
  id_usuario: String,
  nombre_usuario: String,
  hora_fecha: String,
  metodo_pago: String,
  productos: Array,
  direccion: Object,
  total: String,
});

module.exports = mongoose.model('pedido', pedido);
