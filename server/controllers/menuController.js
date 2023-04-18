const Menu = require('../models/menu')
const ObjectId= require ('mongoose').Types.ObjectId
const Restaurant = require('../models/restaurant')

const addMenu = async (req,res)=>{
    let {name, description, price, picture, category, restaurant}= req.body

    try{
        const findRestaurant = await Restaurant.findOne({restaurant})
        if(findRestaurant){
            const sku= `${name + findRestaurant._id.toString()}`
            const findSku = await Menu.findOne({sku})}
        if (findRestaurant && !findSku){
            await Menu.create({restaurant_id: new ObjectId(findRestaurant._id), name, description, price, picture, category, sku});
            res.send({ok:true, message:"The dish was successfully added"})
        } else if (findRestaurant && findSku){
            res.send({ok:true, message:"The dish already exists in this restaurant"})
        } else {
            res.send({ok:true, message:"The restaurant doesn´t exist"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const removeMenu = async (req,res)=>{
    let {_id}= req.body
    
    try{
        if (_id){
            await Menu.deleteOne({sku});
            res.send({ok:true, message:"The dish was successfully removed"})}
        
        else if (!_id) {
            res.send({ok:true, message:"The dish doesn´t exist"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const updateMenu = async (req,res)=>{
    let {name, restaurant, newName, newDescription, newPrice, newPicture, newCategory}= req.body
    
    try{
        const findRestaurant = await Restaurant.findOne({restaurant})
        if(findRestaurant){
            const sku= `${name + findRestaurant._id.toString()}`
            const findSku = await Menu.findOne({sku})}
        if (findRestaurant && findSku){
            await Menu.findOneAndUpdate({sku}, {name: newName, description: newDescription, price: newPrice, picture: newPicture, category: newCategory});
            res.send({ok:true, message:"The dish was successfully updated"})
        } else if (!findRestaurant){
            res.send({ok:true, message:"The restaurant doesn´t exist"})
        } else if (!findSku) {
            res.send({ok:true, message:"The dish doesn´t exist"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}


module.exports={
   addMenu,
   removeMenu,
   updateMenu,
}