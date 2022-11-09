const { Router } = require("express");
const { getAllUsers, login, register } = require("../controllers/user");
const authMiddleware = require("../middleware/authMiddleware");

function userRoute(router) {
  router.get("/user", getAllUsers);
  router.post("/user", register);
  router.post("/session", login);
  router.post("/token", authMiddleware)
}
module.exports = { userRoute } 
