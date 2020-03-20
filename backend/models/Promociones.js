const mongoose = require("mongoose");
const { Schema } = mongoose;

const promocion = new Schema({
  idProducto: String,
  fechaInicio: Date,
  fechaFin: Date,
  porcentaje: Number,
  mensaje: String
});

module.exports = mongoose.model("promocion", promocion);
