const { Router } = require('express');
const inLookController = require('../controllers/inLook.js');
const auth = require('../utils/auth');
const router = Router();

router.get('/get-cities', auth(), inLookController.get.getCities);
router.get('/get-hotels', auth(), inLookController.get.getHotels);
router.post('/min-price', inLookController.post.getMinPrice);
router.post('/hotelservices', inLookController.post.getHotelServices);
// router.post('/manual-send', auth(), bulkSmsController.post.manualSend);

// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
