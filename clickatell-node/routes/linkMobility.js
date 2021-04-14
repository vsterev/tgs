const { Router } = require('express');
const linkMobilityController = require('../controllers/linkMobility');
const auth = require('../utils/auth');
const linkMobilitySender = require('../utils/linkMobility/sender');
const router = Router();

router.post('/manual-send', auth(), linkMobilityController.post.manualSend);
router.post('/check', auth(), linkMobilityController.post.check);
router.get('/checkIn-message/:date', auth(), linkMobilityController.get.checkInMessage);
router.get('/checkOut-message/:date', auth(), linkMobilityController.get.checkOutMessage);
// router.post('/send', auth(), linkMobilityController.post.send);

module.exports = router;
