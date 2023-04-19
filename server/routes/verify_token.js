const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/verifyToken');

router.post('/', controller.verify_token)


module.exports=router;