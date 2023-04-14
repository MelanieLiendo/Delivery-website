const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  picture: {type:Image, required:true},
  category: [{ type: String, required: true, unique: false }], /*promos,starters,main dishes,desserts,beverages*/
  restaurant_id:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'restaurant'
}
});

module.exports = mongoose.model("menu", productSchema);