const { Router } = require('express');
const contactController = require('../controllers/contact');
// const auth = require('../utils/auth')
const router = Router();

router.get('/all', contactController.get.all);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
