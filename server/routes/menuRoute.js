const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/menuController');

router.post('/add', controller.addMenu)
router.post('/remove', controller.removeMenu)




module.exports=router;