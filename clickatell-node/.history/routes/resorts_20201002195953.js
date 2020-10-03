const { Router } = require('express');
const hotelController = require('../controllers/re');
// const auth = require('../utils/auth');
const router = Router();

// router.get('/', contactController.get.all);
router.get('/all', hotelController.get.allHotels);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
