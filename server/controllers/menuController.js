const Menu = require('../models/menu')
const ObjectId= require ('mongoose').Types.ObjectId
const Restaurant = require('../models/restaurant')

const addMenu = async (req,res)=>{
    let {name, description, price, picture, category, email}= req.body
    
    if (!name || !description || !price || !picture || !category){
        return res.json({ ok: false, message: "All fields are required" });
      }
    try{
        const findRestaurant = await Restaurant.findOne({email})
        let findSku = []
        let sku = {}
        if(findRestaurant){
            sku= `${name + findRestaurant._id.toString()}`
            findSku = await Menu.findOne({sku})}
        if (findRestaurant && !findSku){
            await Menu.create({restaurant_id: new ObjectId(findRestaurant._id), name, description, price, picture, category, sku});
            res.send({ok:true, message:"The dish was successfully added"})
        } else if (findRestaurant && findSku){
            res.send({ok:true, message:"The dish already exists in this restaurant"})
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
            await Menu.deleteOne({_id});
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
    let {email, name, newName, newDescription, newPrice, newPicture, newCategory}= req.body
    let findSku = []
        let sku = {}

    if (newName==="" || newDescription==="" || newPrice==="" || newPicture==="" || newCategory===""){
        return res.send({ ok: false, message: "All fields are required" });}
    try{
        const findRestaurant = await Restaurant.findOne({email})
        if(findRestaurant){
             sku= `${name + findRestaurant._id.toString()}`
             findSku = await Menu.findOne({sku})}

        if (name == newName && newDescription == findSku.description && newPrice == findSku.price && newPicture == findSku.picture && newCategory == findSku.category){ 
            res.send({ok: true, message: "No change was made"});}

        if (findRestaurant && findSku){
            await Menu.findOneAndUpdate({sku}, {name: newName, description: newDescription, price: newPrice, picture: newPicture, category: newCategory});
            res.send({ok:true, message:"The dish was successfully updated"})
        }}
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayFilterMenu = async (req,res)=>{
    let {name}= req.body
    try{
        const search = await Menu.findOne({name:name})
        res.send({ok:true, message:search}) 
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAllMenu = async (req,res)=>{
    let {email}= req.body 
    try{
        const findRestaurant = await Restaurant.findOne({email})
        const restaurantMenu = await Menu.find({restaurant_id:findRestaurant._id})
        res.send({ok:true, message:restaurantMenu}) 
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayAll = async (req,res)=>{
    try{
        const menus = await Menu.find()
        res.send({ok:true, message: menus }) 
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}


module.exports={
   addMenu,
   removeMenu,
   updateMenu,
   displayFilterMenu,
   displayAllMenu,
   displayAll,
}