const mongoose = require('mongoose');
const { Schema } = mongoose;

const promocion = new Schema({
  fechaInicio: Date,
  fechaFin: Date,
  porcentaje: Number,
  mensaje: String,
  producto: {
    type: Schema.Types.Mixed,
    ref: 'producto'
  }
});

module.exports = mongoose.model('promocione', promocion);
