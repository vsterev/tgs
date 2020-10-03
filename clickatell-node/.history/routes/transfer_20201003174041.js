const { Router } = require('express');
const transferController = require('../controllers/transfer');
const auth = require('../utils/auth');
const router = Router();

// router.get('/', contactController.get.all);
router.get('/create/:checkOut', auth(), transferController.get.createTransfer);
router.post('/search', auth(), transferController.post.search);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
