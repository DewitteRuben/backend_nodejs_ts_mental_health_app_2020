import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../openapi.json";
import * as AuthController from "./controllers/AuthController";
import * as MoodEntryController from "./controllers/MoodEntryController";
import * as UserController from "./controllers/UserController";
import verifyUserMiddleware from "./middleware/verify-user-middleware";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }"
};

const router = Router();

router.post("/auth", AuthController.auth);
router.post("/user", UserController.add);
router.get("/moodentry", verifyUserMiddleware, MoodEntryController.filter);
router.get("/moodentry", verifyUserMiddleware, MoodEntryController.all);
router.post("/moodentry", verifyUserMiddleware, MoodEntryController.add);

// Dev routes
if (process.env.NODE_ENV === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
