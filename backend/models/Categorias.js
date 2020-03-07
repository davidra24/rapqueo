const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoria = new Schema({
  nombre: String,
  imagen: String,
  descripcion: String
});

module.exports = mongoose.model('categoria', categoria);
