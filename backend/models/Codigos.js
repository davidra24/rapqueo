const mongoose = require('mongoose');
const { Schema } = mongoose;

const codigo = new Schema({
  correo: String,
  codigo: String,
  utilizado: { type: Boolean, default: false },
  expiracion: Date,
});

module.exports = mongoose.model('codigo', codigo);
