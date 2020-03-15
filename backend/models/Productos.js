const mongoose = require("mongoose");
const { Schema } = mongoose;

const producto = new Schema({
  nombre: String,
  foto: String,
  caracteristicas: Object,
  idCategoria: String
});

module.exports = mongoose.model("producto", producto);
