const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario = new Schema({
  telefono: { unique: true, type: String },
  nombre: String,
  apellido: String,
  correo: { unique: true, type: String },
  contrasena: String,
  direccion: Array,
  admin: Boolean,
  displayNotifications: Array,
});

module.exports = mongoose.model('usuario', usuario);
