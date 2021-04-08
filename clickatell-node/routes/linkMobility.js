const { Router } = require('express');
const linkMobilityController = require('../controllers/linkMobility');
const auth = require('../utils/auth');
const router = Router();

router.post('/manual-send', auth(), linkMobilityController.post.manualSend);
router.post('/check', auth(), linkMobilityController.post.check);
// router.post('/send', auth(), linkMobilityController.post.send);

module.exports = router;
