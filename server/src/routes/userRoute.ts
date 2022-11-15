import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/user"
import authMiddleware from "../middleware/authMiddleware"

function userRoute(router: Router): void {
  router.get("/user", getAllUsers);
  router.post("/user", register);
  router.post("/session", login);
  router.post("/token", authMiddleware)
}
export { userRoute } 
