const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: {type:Image, required:true},
  category: { type: String, required: true, unique: false },
  partner:{type: String, required: true}
});

module.exports = mongoose.model("product", productSchema);