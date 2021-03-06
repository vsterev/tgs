const { Router } = require('express');
const repController = require('../controllers/rep');
const auth = require('../utils/auth');
const router = Router();

router.get('/all', auth(), repController.get.all);
router.get('/get-hotel/:repId', auth(), repController.get.allHotelsByRep);
router.post('/add/', auth(), repController.post.add);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
