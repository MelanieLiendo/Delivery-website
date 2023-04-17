const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    country:{type: String, required: true},
    city:{type:String, required: true},
    address:{type:String, required:true},
    restaurant: {type:String, required: true, unique: true},
    name: { type: String, required: true},
    surname: {type:String, required: true},
    phone:{type:Number, required:true},
    email: {type:String, required: true, unique:true},
    password: {type:String, required: true},
    filter: [{type:String}] /*gluten free, vegan, vegetarian, healthy, fast food*/
});

module.exports = mongoose.model("restaurant", restaurantSchema);