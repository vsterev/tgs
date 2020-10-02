const { Router } = require('express');
const repController = require('../controllers/rep');
const auth = require('../utils/auth');
const router = Router();

router.get('/', repController.get.all);
router.get('/date/:checkOut', auth(), repController.get.checkOut);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
