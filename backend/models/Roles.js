const mongoose = require('mongoose');
const { Schema } = mongoose;

const rol = new Schema({
    nombre: String,
    permiso: Array
});

module.exports = mongoose.model('rol', rol);
