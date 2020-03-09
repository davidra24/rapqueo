const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuario = new Schema({
    telefono: String,
    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String,
    direccion: Array,
    metPago: Array
});

module.exports = mongoose.model('usuario', usuario);
