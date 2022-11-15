import { Router } from "express";
import { postUrl, urlNavigate, getAllUrl, getUrlUser, deleteUrl } from "../controllers/url";
import authMiddleware from "../middleware/authMiddleware"

function urlRoute(router: Router): void {
  router.get("/urlGetAll", getAllUrl);
  router.get("/:shortUrlId", urlNavigate);
  router.get("/urlUser/:userId", getUrlUser);
  router.post("/url", postUrl);
  router.delete("/deleteUrl/:userId/:urlId", deleteUrl);
}

export { urlRoute } 
