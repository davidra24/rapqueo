const mongoose = require('mongoose');
const { Schema } = mongoose;

const producto = new Schema({
    nombre: String,
    foto: Array,
    caracteristicas: Array, 
});

module.exports = mongoose.model('producto', producto);
