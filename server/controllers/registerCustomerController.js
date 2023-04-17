const Customer = require('../models/customer')
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

const registerCustomer = async (req,res)=>{
    let {name,email,password, password2, address,admin}= req.body
    const salt = "corazones429"
    const findEmail = await Customer.findOne({email})
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
        if (findEmail){
            res.send({ok:true, data:"This email is already registered in Foodies"})
        }
        else{
            const hash = await argon2.hash(password,salt);
            await Customer.create({name,email,password:hash, address, admin})
            res.send({ok:true, data:"The customer was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}



module.exports={
    registerCustomer,
}