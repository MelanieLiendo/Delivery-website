const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/orderController');

router.post('/add', controller.addOrder)
router.post('/displayOrders', controller.displayFilterOrder)


module.exports=router;