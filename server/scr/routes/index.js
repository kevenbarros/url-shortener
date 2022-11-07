const { Router } = require("express");
const { userRoute } = require("./userRoute");
const { urlRoute } = require("./urlRoute");
const router = Router();

function routesModule() {
  userRoute(router);
  urlRoute(router);
  return router;
}

module.exports = { routesModule } 
