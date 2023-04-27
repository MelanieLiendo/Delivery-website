const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    restaurant: {type: String, required: true}, 
    menu: [
    { dish: {type: String, required: true},
    quantity: {type: Number, required: true}
    }],
    totalPrice: {type: Number, required: true},
    customer_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'customer'
    }
});

module.exports = mongoose.model("order", orderSchema);

