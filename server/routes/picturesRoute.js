const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/picturesController');

router.post('/upload', controller.upload);
router.post('/remove', controller.remove);
router.post('/getPictureMenu', controller.getPictureMenu);
router.post('/getPictureRestaurant', controller.getMenusOfRestaurant);


module.exports = router;