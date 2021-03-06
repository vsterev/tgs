const { Router } = require('express');
const repController = require('../controllers/rep');
const auth = require('../utils/auth');
const router = Router();

router.get('/all', auth(), repController.get.all);
router.get('/all-hotels', auth(), repController.get.allHotels);
router.get('/hotels-get/:repId', auth(), repController.get.allHotelsByRep);
router.post('/add', auth(), repController.post.add);
// router.post('/hotels-update', auth(), repController.post.hotelsUpdate);
router.post('/update', auth(), repController.post.update);
router.post('/delete', auth(), repController.post.delete);
// router.get('/details/:id', auth(), reservationController.get.details)
// router.all('*', auth(), villaController.get.notFound);

module.exports = router;
