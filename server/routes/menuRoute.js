const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/menuController');

router.post('/add', controller.addMenu)
router.post('/remove', controller.removeMenu)
router.post('/update', controller.updateMenu)




module.exports=router;