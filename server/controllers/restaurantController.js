const Restaurant = require('../models/restaurant')
const Menu = require("../models/menu")
const argon2 = require("argon2"); 
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;


const removeRestaurant = async (req,res)=>{
    let {email}= req.body /* the email of the logged in restaurant*/
    
    try{
        const findRestaurant = await Restaurant.findOne({email})
        console.log(findRestaurant);
        if (findRestaurant){
           const removeMenu = await Menu.deleteMany({restaurant_id: findRestaurant._id})
            const removeRes = await Restaurant.deleteOne({email})
            console.log(removeMenu);
            console.log(removeRes);
            res.send({ok:true, message:"The restaurant was successfully removed"})
        }
        else{
            res.send({ok:true, message:"This email is not registered in Foodies"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}


const updateRestaurant = async (req,res)=>{
    let {newCountry, newCity, newAddress, newRestaurant, newName, newSurname, newPhone, email, newFilter, newPicture}= req.body 
    try{
        const findEmail = await Restaurant.findOne({email})
        let arrayFilters = findEmail.filter
        let filterChange = false
        if (newFilter != undefined){
        arrayFilters.forEach((ele)=>{
            if (newFilter.includes(ele) && arrayFilters.length == newFilter.length){
                filterChange=true}
        })
    }
        if (!findEmail){
            res.send({ok:true, message:"This email is not registered in Foodies"})
        }
        else if (newAddress == findEmail.address && newCountry == findEmail.country && newCity== findEmail.city && newRestaurant == findEmail.restaurant && newName == findEmail.name && newSurname == findEmail.surname && newPhone == findEmail.phone && newPicture == findEmail.picture && filterChange){ 
            res.send({ok: true, message: "No change was made"});}
        else{
            await Restaurant.findOneAndUpdate({email}, {country: newCountry, city: newCity, address: newAddress, restaurant: newRestaurant, name: newName, surname: newSurname, phone: newPhone, filter: newFilter, picture: newPicture})
            res.send({ok:true, message:"The restaurant was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const updatePassRestaurant = async (req,res)=>{
    let {email,newPassword,newPassword2, actualPasswordInput}= req.body 
    const salt = "corazones429"
    if (newPassword !== newPassword2){
        return res.json({ ok: false, message: "Passwords must match" });}
  try{
        let restaurant = await Restaurant.findOne({email})
        let match = await argon2.verify(restaurant.password, actualPasswordInput);
        let notChange = await argon2.verify(restaurant.password, newPassword);
        if (!match){ 
            res.json({ok: false, message: "The actual password is not correct. Try it again" });}
        else if (notChange){ 
            res.json({ok: false, message: "No change was made"});}
        else{
            const hash = await argon2.hash(newPassword,salt);
            await Restaurant.findOneAndUpdate({email},{password:hash})
            res.send({ok:true, message:"The password was successfully updated"})   }
      }

  catch(error){
      res.send({ok:false,message:{error}})
  }
}

const registerRestaurant = async (req,res)=>{
    let {country, city, address,restaurant, name, surname, phone, email, password, password2, filter}= req.body
    const salt = "corazones429"

    if (typeof(phone)!= "number"){
        return res.json({ ok: false, message: "Invalid phone number" });
      }

    if (!email || !password || !password2 || !country || !city || !address || !restaurant || !name || !surname || !phone || !filter){
        return res.json({ ok: false, message: "All fields required" });
      }
      if (password !== password2){
        return res.json({ ok: false, message: "Passwords must match" });
      }
      if (!validator.isEmail(email)){
        return res.json({ ok: false, message: "Invalid email" });
      }
    try{
        const findEmail = await Restaurant.findOne({email})
        const findRestaurant = await Restaurant.findOne({restaurant})
        if (findEmail || findRestaurant){
            res.send({ok:true, message:"This email is already registered in Foodies"})
        }
        else{
            const hash = await argon2.hash(password,salt);
            await Restaurant.create({country, city, address,restaurant, name, surname, phone, email, password:hash, filter})
            res.send({ok:true, message:"The restaurant was successfully added"})
        }
    }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const loginRestaurant = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password){
      return res.json({ ok: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)){
      return res.json({ ok: false, message: "Invalid email provided" });
    }
    try {
      const restaurant = await Restaurant.findOne({ email });
      if (!restaurant) return res.json({ ok: false, message: "Invalid email provided" });
      const match = await argon2.verify(restaurant.password, password);
      if (match) {
        const token = jwt.sign({userEmail:restaurant.email, userType:"restaurant"}, jwt_secret, { expiresIn: "1h" }); 
        res.json({ ok: true, message: "Welcome back!", token, email });
      } else return res.json({ ok: false, message: "Invalid data provided" });
    } catch (error) {
      res.json({ ok: false, error });
    }
  };

  const displayAllRestaurant = async (req,res)=>{
    try{
        const restaurants = await Restaurant.find()
        res.send({ok:true, message:restaurants})   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}

const displayRestaurantInfo = async (req,res)=>{
  let {email}= req.body
  try{

      const restaurantInfo = await Restaurant.findOne({email})
      res.send({ok:true, message:restaurantInfo}) 
      }
  catch(error){
      res.send({ok:false,message:{error}})
  }
}

const displayFilterRestaurant = async (req,res)=>{
    let {id}= req.params 
    try{
        const restaurants = await Restaurant.findOne({_id: id})
        res.send({ok:true, message:restaurants})
        console.log(restaurants)   
        }
    catch(error){
        res.send({ok:false,message:{error}})
    }
}




module.exports={
    removeRestaurant,
    updateRestaurant,
    registerRestaurant,
    loginRestaurant,
    displayAllRestaurant,
    displayFilterRestaurant,
    displayRestaurantInfo,
    updatePassRestaurant
}