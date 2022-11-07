const { Router } = require("express");
const { getAllUsers, login, register } = require("../controllers/user");

function userRoute(router) {
  router.get("/user", getAllUsers);
  router.post("/user", register);
  router.post("/session", login);
}
module.exports = { userRoute } 
