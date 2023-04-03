import { Router } from "express";
import { userRoute } from "./userRoute";
import { urlRoute } from "./urlRoute";
import { tokenRoute } from "./tokenRoute";
const router = Router();

export function routesModule() {
  userRoute(router)
  urlRoute(router)
  tokenRoute(router)
  return router;
}
