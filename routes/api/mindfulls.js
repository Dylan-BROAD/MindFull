const express = require("express");
const router = express.Router();
const mindfullsCtrl = require("../../controllers/api/mindfull");
// require the authorization middleware function
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.get("/", ensureLoggedIn, mindfullsCtrl.index);
router.get("/:id", ensureLoggedIn, mindfullsCtrl.show);
// router.post("/", ensureLoggedIn, mindfullsCtrl.createNote);
// router.put("/:id", ensureLoggedIn, mindfullsCtrl.updateNote);
// router.delete("/:id", ensureLoggedIn, mindfullsCtrl.deleteNote);

module.exports = router;