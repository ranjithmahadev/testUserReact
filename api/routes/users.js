var express = require("express");
var router = express.Router();
const { addUser, getAllUsers, updateUser, deleteUser } = require("../controllers/user.controller");

/* User routes. */
router.post("/user", addUser);
router.get("/users", getAllUsers);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;