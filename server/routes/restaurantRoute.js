const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/restaurantController');

router.post('/register', controller.registerRestaurant)
router.post('/remove', controller.removeRestaurant)
router.post('/update', controller.updateRestaurant)



module.exports=router;