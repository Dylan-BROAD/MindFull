const express = require("express");
const router = express.Router();
const mindfullsCtrl = require("../../controllers/api/mindfulls");
// require the authorization middleware function


router.get("/", mindfullsCtrl.index);
router.get("/:id",  mindfullsCtrl.show);
// router.post("/", ensureLoggedIn, mindfullsCtrl.createNote);
// router.put("/:id", ensureLoggedIn, mindfullsCtrl.updateNote);
// router.delete("/:id", ensureLoggedIn, mindfullsCtrl.deleteNote);

module.exports = router;