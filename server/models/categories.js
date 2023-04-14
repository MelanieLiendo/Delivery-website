const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  partner:{type: String, required: true}
});

module.exports = mongoose.model("category", categorySchema);