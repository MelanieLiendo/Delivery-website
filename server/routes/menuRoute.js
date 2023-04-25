const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/menuController');

router.post('/add', controller.addMenu)
router.post('/remove', controller.removeMenu)
router.post('/update', controller.updateMenu)
router.get('/all', controller.displayAll)
router.post('/restaurant', controller.displayAllMenu)
router.post('/dish', controller.displayFilterMenu)




module.exports=router;