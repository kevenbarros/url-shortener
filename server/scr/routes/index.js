const { Router } = require("express");
const { userRoute } = require("./userRoute");
const { urlRoute } = require("./urlRoute");
const { tokenRoute } = require("./tokenRoute");
const router = Router();

function routesModule() {
  userRoute(router);
  urlRoute(router);
  tokenRoute(router)
  return router;
}

module.exports = { routesModule } 
