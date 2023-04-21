const express = require ('express')
router        = express.Router(),
    controller    = require('../controllers/menuController');

router.post('/add', controller.addMenu)
router.post('/remove', controller.removeMenu)
router.post('/update', controller.updateMenu)
router.get('/:name', controller.displayFilterMenu)
router.get('/:restaurant_id', controller.displayAllMenu)



module.exports=router;