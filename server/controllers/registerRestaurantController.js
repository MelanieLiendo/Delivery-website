const Restaurant = require('../models/restaurant')
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;


const registerRestaurant = async (req,res)=>{
    let {country, city, address,restaurant, name, surname, phone, email, password, password2, filter}= req.body
    const findEmail = await Restaurant.findOne({email})
    const findRestaurant = await Restaurant.findOne({restaurant})
    const salt = "corazones429"

    if (!email || !password || !password2){
        return res.json({ ok: false, message: "All fields required" });
      }
      if (password !== password2){
        return res.json({ ok: false, message: "Passwords must match" });
      }
      if (!validator.isEmail(email)){
        return res.json({ ok: false, message: "Invalid email" });
      }
    try{
        if (findEmail || findRestaurant){
            res.send({ok:true, data:"This email is already registered in Foodies"})
        }
        else{
            const hash = await argon2.hash(password,salt);
            await Restaurant.create({country, city, address,restaurant, name, surname, phone, email, password:hash, filter})
            res.send({ok:true, data:"The restaurant was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}


module.exports={
    registerRestaurant,
}

