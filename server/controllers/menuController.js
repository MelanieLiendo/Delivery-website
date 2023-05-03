const Menu = require('../models/menu')
const ObjectId= require ('mongoose').Types.ObjectId
const Restaurant = require('../models/restaurant')

const addMenu = async (req,res)=>{
    let {name, description, price, category, email}= req.body

    if (typeof(price)!= "number"){
        return res.json({ ok: false, message: "Invalid price" });}

    if (!name || !description || !price || !category){
        return res.json({ ok: false, message: "All fields are required" });}
    try{
        const findRestaurant = await Restaurant.findOne({email})
        let findSku = []
        let sku = {}
        if(findRestaurant){
            sku= `${name + findRestaurant._id.toString()}`
            findSku = await Menu.findOne({sku})}
        if (findRestaurant && !findSku){
            await Menu.create({restaurant_id: new ObjectId(findRestaurant._id), name, description, price, category, sku});
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
    let {email,name}= req.body
    var findSku
    var sku
    try{
        const findRestaurant = await Restaurant.findOne({email})
        if(findRestaurant){
            sku =`${name + findRestaurant._id.toString()}`
            findSku = await Menu.findOne({sku})
            if (findSku){
                await Menu.deleteOne({sku});
                res.send({ok:true, message:"The dish was successfully removed"})}
            else{
                res.send({ok:true, message:"The dish doesn't exist"})
            }
            }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const updateMenu = async (req,res)=>{
    let {email, name, newName, newDescription, newPrice, newPicture, newCategory}= req.body
    let findSku
        let sku
        let newSku 
    try{
        const findRestaurant = await Restaurant.findOne({email})
        if(findRestaurant){
             sku= `${name + findRestaurant._id.toString()}`
             findSku = await Menu.findOne({sku})}
        if (findRestaurant && findSku){
            if (name == newName && newDescription == findSku.description && newPrice == findSku.price && newPicture == findSku.picture && newCategory == findSku.category){ 
                res.send({ok: true, message: "No change was made"});}
            else{
                newSku = `${newName + findRestaurant._id.toString()}`
                await Menu.findOneAndUpdate({sku}, {sku:newSku, name: newName, description: newDescription, price: newPrice, picture: newPicture, category: newCategory});
                res.send({ok:true, message:"The dish was successfully updated"})}
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

const displayOneRestMenu = async (req,res)=>{
    let {id}= req.params
    try{
        const search = await Menu.find({restaurant_id: id})
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
   displayOneRestMenu
}