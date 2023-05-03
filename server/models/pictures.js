const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    photo_url:{ 
        type:String, 
        unique:true, 
        required:true 
    },
    public_id:{ 
        type:String,
        unique:true, 
        required:true 
    } ,
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'restaurant'
        },
    menu_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'menu'
            }
},
{strictQuery: false}
)

module.exports = mongoose.model('pictures', pictureSchema);