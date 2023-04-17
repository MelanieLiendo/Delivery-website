const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/customerController');

router.post('/register', controller.registerCustomer)
router.post('/update', controller.updateCustomer)
router.post('/remove', controller.removeCustomer)
router.post('/login', controller.loginCustomer)


module.exports=router;