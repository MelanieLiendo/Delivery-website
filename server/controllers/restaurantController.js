const Restaurant = require('../models/restaurant')

const registerRestaurant = async (req,res)=>{
    let {country, city, address,restaurant, name, surname, phone, email, password}= req.body
    const findEmail = await Restaurant.findOne({email})
    try{
        if (findEmail){
            res.send({ok:true, data:"This email is already registered in Foodies"})
        }
        else{
            await Customer.create({country, city, address,restaurant, name, surname, phone, email, password})
            res.send({ok:true, data:"The restaurant was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}

const removeRestaurant = async (req,res)=>{
    let {email}= req.body /* the email of the logged in restaurant*/
    const findEmail = await Restaurant.findOne({email})
    try{
        if (findEmail){
            await Customer.deleteOne({email})
            res.send({ok:true, data:"The restaurant was successfully removed"})  
        }
        else{
            res.send({ok:true, data:"This email is not registered in Foodies"})
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}

module.exports={
    registerRestaurant,
    removeRestaurant,
}