const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/api/users');
// require the authorization middleware function
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/users
router.get('/check-token', ensureLoggedIn, usersCtrl.checkToken);
router.post('/', usersCtrl.create);
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;