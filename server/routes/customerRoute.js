const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/customerController');

router.post('/update', controller.updateCustomer)
router.post('/remove', controller.removeCustomer)
router.post('/register', controller.registerCustomer)
router.post('/login', controller.loginCustomer)
router.post('/customer', controller.displayCustomer)
router.post('/updatePassword', controller.updatePassCustomer)


module.exports=router;