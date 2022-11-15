import { Router } from "express"
import { checkerToken } from "../controllers/token"

function tokenRoute(router: Router): void {
  router.post("/checkerToken", checkerToken)
}
export { tokenRoute } 
