const { Router } = require('express');
const contactController = require('../controllers/contact');
const auth = require('../utils/auth');
const router = Router();

router.get('/', auth(), contactController.get.all);
router.get('/checkout/:date', auth(), contactController.get.checkOut);
router.get('/checkin/:date', auth(), contactController.get.checkIn);
router.get('/checkInMessage/:date', auth(), contactController.get.checkInMessage);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
