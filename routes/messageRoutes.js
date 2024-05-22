// routes/messageRoutes.js
const { Router } = require("express");
const { authorizeUser } = require("../middleware/authorizeUser");
const { postMessage, getMessages } = require("../controllers/message");

const router = Router();

router.post("/send", authorizeUser, postMessage);
router.get("/", authorizeUser, getMessages);

module.exports = router;
