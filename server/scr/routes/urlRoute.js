const { Router } = require("express");
const { postUrl, urlNavigate, getAllUrl, getUrlUser, deleteUrl } = require("../controllers/url");
const authMiddleware = require("../middleware/authMiddleware");

function urlRoute(router) {
  router.get("/urlGetAll", getAllUrl);
  router.get("/urlUser", authMiddleware, getUrlUser);
  router.get("/:shortUrlId", urlNavigate);
  router.post("/url", postUrl);
  router.delete("/deleteUrl", authMiddleware, deleteUrl);
}


module.exports = { urlRoute } 
