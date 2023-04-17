const Restaurant = require('../models/restaurant')


const removeRestaurant = async (req,res)=>{
    let {email}= req.body /* the email of the logged in restaurant*/
    const findEmail = await Restaurant.findOne({email})
    try{
        if (findEmail){
            await Restaurant.deleteOne({email})
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


const updateRestaurant = async (req,res)=>{
    let {newCountry, newCity, newAddress, newRestaurant, newName, newSurname, newPhone, email, newEmail, newPassword, newFilter}= req.body 
    const findEmail = await Restaurant.findOne({email})
    try{
        if (!findEmail){
            res.send({ok:true, data:"This email is not registered in Foodies"})
        }
        else{
            await Restaurant.findOneAndUpdate({email}, {country: newCountry, city: newCity, address: newAddress, restaurant: newRestaurant, name: newName, surname: newSurname, phone: newPhone, email: newEmail, password:newPassword, filter: newFilter})
            res.send({ok:true, data:"The restaurant was successfully updated"})   
        }
    }
    catch(error){
        res.send({ok:false,data:{error}})
    }
}

module.exports={
    removeRestaurant,
    updateRestaurant,
}