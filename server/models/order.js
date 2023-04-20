const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    restaurant: {type: String, required: true}, 
    quantity:{type: Number, required: true},
    menu: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    customer_id:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'customer'
    }
});

module.exports = mongoose.model("order", orderSchema);

