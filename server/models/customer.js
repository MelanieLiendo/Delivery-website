const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email:{type: String, required: true, unique: true},
  password:{type: String, required: true},
  address:{type: String, required: true}, /*maybe we need to add a new model with the addresses because then you can add new ones*/
  admin: {type:Boolean, required:true, default: false}
},
{strictQuery: false}
);

module.exports = mongoose.model("customer", customerSchema);