const mongoose = require("mongoose");
const { Schema } = mongoose;

const producto = new Schema({
  nombre: String,
  foto: Array,
  caracteristicas: Object,
  categoria_id: String
});

module.exports = mongoose.model("producto", producto);
