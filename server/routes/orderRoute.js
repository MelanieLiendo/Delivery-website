const express = require ('express')
router        = express.Router(),
    controller    = require('../controller/orderController');

router.post('/add', controller.addOrder)


module.exports=router;