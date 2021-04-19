const { Router } = require('express');
const hotelController = require('../controllers/hotel');
const auth = require('../utils/auth');
const router = Router();

// router.get('/', contactController.get.all);
router.get('/all', auth(), hotelController.get.allHotels);
router.get('/ratting/:hotelId', auth(), hotelController.get.ratting);
router.get('/ratting-all', auth(), hotelController.get.allHotelsRaing);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
