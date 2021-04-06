const { Router } = require('express');
const bulkSmsController = require('../controllers/bulkSms');
const auth = require('../utils/auth');
const router = Router();

// router.get('/', contactController.get.all);
router.get('/profile', bulkSmsController.get.profile);
router.post('/manual-send', auth(), bulkSmsController.post.manualSend);
router.get('/message/info/:messageId', auth(), bulkSmsController.get.bulckMessageInfo);

// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
