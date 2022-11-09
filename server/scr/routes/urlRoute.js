const { Router } = require("express");
const { postUrl, urlNavigate, getAllUrl, getUrlUser, deleteUrl } = require("../controllers/url");
const authMiddleware = require("../middleware/authMiddleware");

function urlRoute(router) {
  router.get("/urlGetAll", getAllUrl);
  router.get("/:shortUrlId", urlNavigate);
  router.post("/urlUser", getUrlUser);
  router.post("/url", postUrl);
  router.post("/deleteUrl", deleteUrl);
}


module.exports = { urlRoute } 
