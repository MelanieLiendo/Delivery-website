const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/verifyTokenController');

router.post('/', controller.verify_token)


module.exports=router;