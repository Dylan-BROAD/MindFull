const express = require("express");
const router = express.Router();
const mindfullsCtrl = require("../../controllers/api/mindfulls");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get('/user/:name', ensureLoggedIn, mindfullsCtrl.displayAllByUser);
router.get('/', ensureLoggedIn, mindfullsCtrl.index);
router.get('/:id', ensureLoggedIn, mindfullsCtrl.show);
router.post('/', ensureLoggedIn, mindfullsCtrl.create);
router.delete('/:id', ensureLoggedIn, mindfullsCtrl.delete);
router.put('/:id', ensureLoggedIn, mindfullsCtrl.update)

module.exports = router;