const express = require ('express')
router        = express.Router(),
    controller = require('../controllers/registerCustomerController')

router.post('/', controller.registerCustomer)



module.exports=router;