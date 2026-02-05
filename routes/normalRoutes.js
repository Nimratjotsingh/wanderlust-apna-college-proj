const express = require('express');
const router = express.Router();

const controller = require('../controllers/normalControls');

router.get('/',controller.home);
router.get('/listing/:id', controller.listing);
router.get('/new',controller.new);
router.get('/edit/:id',controller.edit);

router.post('/listing',controller.listingReq);

router.put('/listing/:id',controller.editReq);

router.delete('/listing/:id',controller.deleteReq)

module.exports = router;