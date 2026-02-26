const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewsController');
const {isLoggedIn} = require('../middleware/isLoggedIn');

router.post('/listing/:id/review',isLoggedIn,controller.reviewReq);

router.delete('/listing/:id/review/:reviewId',controller.deleteReview)

module.exports= router;
