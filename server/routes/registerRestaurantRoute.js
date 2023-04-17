const express = require ('express')
router        = express.Router(),
    controller = require('../controllers/registerRestaurantController')

router.post('/', controller.registerRestaurant)



module.exports=router;