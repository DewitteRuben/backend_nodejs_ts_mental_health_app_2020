import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../openapi.json";
import * as AuthController from "./controllers/AuthController";
import * as MoodEntryController from "./controllers/MoodEntryController";
import * as ProfessionalController from "./controllers/ProfessionalController/index";
import verifyUserMiddleware from "./middleware/verify-user-middleware";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }"
};

const router = Router();

router.post("/auth/user", AuthController.auth);
router.post("/auth/professional", AuthController.authProfessional);

router.post("/professional", ProfessionalController.add);
router.post("/user", ProfessionalController.registerUser);

router.get("/moodentry", verifyUserMiddleware, MoodEntryController.filter);
router.get("/moodentry", verifyUserMiddleware, MoodEntryController.all);
router.post("/moodentry", verifyUserMiddleware, MoodEntryController.add);

// Dev routes
if (process.env.NODE_ENV === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
