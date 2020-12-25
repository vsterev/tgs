const { Router } = require('express');
const contactController = require('../controllers/contact');
const auth = require('../utils/auth');
const router = Router();

router.get('/', auth(), contactController.get.all);
router.get('/checkout/:date', auth(), contactController.get.checkOut);
router.get('/checkin/:date', auth(), contactController.get.checkIn);
router.get('/checkInMessage/:date', auth(), contactController.get.checkInMessage);
router.get('/all-without-planned/transsfer/:date', auth(), contactController.get.getAllWatingTransfer);
router.get('/contacts/test', auth(), contactController.get.testIncludeArr);
router.post('/update', auth(), contactController.post.update);
router.post('/update-many', auth(), contactController.post.updateMany);
router.post('/update-many-array', auth(), contactController.post.updataArrayContacts);
router.post('/checkout', auth(), contactController.post.checkOut);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
