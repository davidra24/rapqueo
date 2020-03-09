const mongoose = require('mongoose');
const { Schema } = mongoose;

const promocion = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    porcentaje: String,
    mensaje: String,
});

module.exports = mongoose.model('promocion', promocion);