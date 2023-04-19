const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/restaurantController');

router.post('/remove', controller.removeRestaurant)
router.post('/update', controller.updateRestaurant)
router.post('/updatePassword', controller.updatePassRestaurant)
router.post('/register', controller.registerRestaurant)
router.post('/login', controller.loginRestaurant)
router.get('/displayAll', controller.displayAllRestaurant)
router.get('/:restaurant', controller.displayFilterRestaurant)
router.post('/restaurant', controller.displayRestaurantInfo)




module.exports=router;