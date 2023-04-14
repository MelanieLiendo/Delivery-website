const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
    country:{type: String, required: true},
    city:{type:String, required: true},
    adress:{type:String, required:true},
    restaurant: {type:String, required: true},
    name: { type: String, required: true},
    surname: {type:String, required: true},
    email: {type:String, required: true},
});

module.exports = mongoose.model("partner", categorySchema);