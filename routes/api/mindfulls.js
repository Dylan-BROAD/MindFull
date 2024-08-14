const express = require("express");
const router = express.Router();
const mindfullsCtrl = require("../../controllers/api/mindfulls");
// require the authorization middleware function


router.get('/user/:name', mindfullsCtrl.displayAllByUser);
router.get('/', mindfullsCtrl.index);
router.get('/:id', mindfullsCtrl.show);
router.post('/', mindfullsCtrl.create);
router.delete('/:id', mindfullsCtrl.delete);
router.put('/:id', mindfullsCtrl.update)

module.exports = router;