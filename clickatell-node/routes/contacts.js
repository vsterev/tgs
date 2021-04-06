const { Router } = require('express');
const contactController = require('../controllers/contact');
const auth = require('../utils/auth');
const router = Router();

router.get('/', auth(), contactController.get.all);
router.get('/checkout/:date', auth(), contactController.get.checkOut);
router.get('/checkin/:date', auth(), contactController.get.checkIn);
router.get('/checkInMessage/:date', auth(), contactController.get.checkInMessage);
router.get('/checkIn-message-bulkSms/:date', auth(), contactController.get.checkInMessageBulkSms);
router.get('/checkIn-message-bulkSms2/:date', auth(), contactController.get.checkInMessageBulkSms2);
router.get('/checkOut-message-bulkSms2/:date', auth(), contactController.get.checkOutMessageBulkSms2);
// router.get('/bulk-sms/message/info/:messageId', auth(), contactController.get.bulckMessageInfo);
// router.get('/bulk-sms/profile', auth(), contactController.get.bulckProfile);
// router.post('/bulk-sms/manual-send', auth(), contactController.post.bulckManualSend);
router.get('/checkIn-message-contact-check/:date', auth(), contactController.get.checkCheckInContacts);
router.get('/checkOut-message-contact-check/:date', auth(), contactController.get.checkCheckOutContacts);
router.get('/all-without-planned/transsfer/:date', auth(), contactController.get.getAllWatingTransfer);
router.get('/contacts/test', auth(), contactController.get.testIncludeArr);
router.post('/update', auth(), contactController.post.update);
router.post('/update-many', auth(), contactController.post.updateMany);
router.post('/update-many-array', auth(), contactController.post.updataArrayContacts);
router.post('/checkout', auth(), contactController.post.checkOut);
router.post('/checkin', auth(), contactController.post.checkIn);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
