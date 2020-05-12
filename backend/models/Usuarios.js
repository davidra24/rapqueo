const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario = new Schema({
  telefono: { unique: true, type: String },
  nombre: String,
  apellido: String,
  correo: { unique: true, type: String },
  contrasena: String,
  direccion: Array,
  admin: { type: Boolean, default: false },
  mensajero: { type: Boolean, default: false },
  displayNotifications: Array,
});

module.exports = mongoose.model('usuario', usuario);
