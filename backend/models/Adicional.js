const mongoose = require("mongoose");
const { Schema } = mongoose;

const adicional = new Schema({
  precio: Number,
});

module.exports = mongoose.model("adicional", adicional);
