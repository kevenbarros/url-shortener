const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { checkerToken } = require("../controllers/token");

function tokenRoute(router) {
  router.post("/checkerToken", checkerToken)
}
module.exports = { tokenRoute } 
