const express = require('express');
const router = express.Router();
const {isLoggedIn}  = require('../middleware/isLoggedIn');
const multer = require('multer');
const {storage}  = require('../cloudConfig')
const upload = multer({storage});
const controller = require('../controllers/normalControls');


router.get('/',controller.home);
router.get('/listing/:id', controller.listing);
router.get('/new',isLoggedIn,controller.new);
router.get('/edit/:id',isLoggedIn,controller.edit);

router.post('/listing',isLoggedIn,upload.single('image'),controller.listingReq);

router.put('/listing/:id',isLoggedIn,controller.editReq);

router.delete('/listing/:id',isLoggedIn,controller.deleteReq)

module.exports = router;