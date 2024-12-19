const express = require("express");
const router = express.Router();
const authMiddleware = require("./Middleware/authMiddleware");
const { registerUser, login } = require("./controllers/userControllers");
const { createAnnounce, getAnnounces , updateAnnounce, deleteAnnounce} = require("./controllers/announceControllers");

router.post("/register", registerUser);
router.post("/login", login);
router.post("/announce", authMiddleware, createAnnounce);
router.get("/announces", authMiddleware, getAnnounces);
router.put("/announces/:announceId", authMiddleware, updateAnnounce);
router.delete("/announce/:announceId", authMiddleware, deleteAnnounce);

module.exports = router;