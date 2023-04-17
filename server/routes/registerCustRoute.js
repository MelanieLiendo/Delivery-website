const express = require ('express')
router        = express.Router(),
    controller = require('../controllers/registerCustomerController')

router.post('/register', controller.registerCustomer)
router.post('/login', controller.loginCustomer)
router.post('/verify_token', controller.verify_tokenCustomer)



module.exports=router;