const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/restaurantController');

router.post('/remove', controller.removeRestaurant)
router.post('/update', controller.updateRestaurant)
router.post('/updatePassword', controller.updatePassRestaurant)
router.post('/register', controller.registerRestaurant)
router.post('/login', controller.loginRestaurant)
router.get('/displayAll', controller.displayAllRestaurant)
router.post('/restaurant', controller.displayRestaurantInfo)

router.get('/:id', controller.displayFilterRestaurant)




module.exports=router;