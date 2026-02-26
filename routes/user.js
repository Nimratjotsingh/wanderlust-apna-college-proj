const express = require('express');
const router = express.Router();
const {redirectUrl} = require('../middleware/isLoggedIn');
const controller = require('../controllers/userController');
const passport = require('passport')

router.get('/signup',controller.signup);
router.get('/login', controller.login);
router.get('/logout',controller.logOut)

router.post('/signup', controller.signupReq);
router.post('/login', redirectUrl,passport.authenticate("local",{failureRedirect: '/login'}),controller.loginReq);

module.exports = router;