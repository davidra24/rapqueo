const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedido = new Schema({
    fecha: Date,
    metPago: String,
    productos: Array,
    direccion: String
});

module.exports = mongoose.model('pedido', pedido);