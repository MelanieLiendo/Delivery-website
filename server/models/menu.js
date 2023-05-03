const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({
  name: { type: String, required: true},
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: {type:String, required:false},
  category: { type: String, required: true, unique: false }, /*starters,main dishes,desserts,beverages*/
  sku: {type: String, required: true, unique: true}, 
  restaurant_id:{
  type: mongoose.Schema.Types.ObjectId,
  required:true,
  ref:'restaurant'
}
});

module.exports = mongoose.model("menu", menuSchema);



