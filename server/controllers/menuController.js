const Menu = require('../models/menu')
const ObjectId= require ('mongoose').Types.ObjectId
const Restaurant = require('../models/restaurant')

const addMenu = async (req,res)=>{
    let {name, description, price, picture, category, restaurant}= req.body
    const findRestaurant = await Restaurant.findOne({restaurant})
    try{
        if (findRestaurant){
            await Menu.create({restaurant_id: new ObjectId(findRestaurant._id), name, description, price, picture, category});
            res.send({ok:true, data:"The menu was successfully added"})
        }
        else{
            res.send({ok:true, data:"The restaurant doesn´t exist"})
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}


module.exports={
   addMenu,
}