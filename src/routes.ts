import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../openapi.json";
import * as AuthController from "./controllers/AuthController";
import * as MoodEntryController from "./controllers/MoodEntryController";
import * as ProfessionalController from "./controllers/ProfessionalController/index";
import * as TaskController from "./controllers/TaskController/index";
import verifyUserMiddleware from "./middleware/verify-user-middleware";
import verifyProfessionalMiddleware from "./middleware/verify-professional-middleware";

const swaggerUiOptions = {
  customCss: ".swagger-ui .topbar { display: none }"
};

const router = Router();

router.post("/auth/user", AuthController.auth);
router.post("/auth/professional", AuthController.authProfessional);
router.post("/auth/professional/refresh", AuthController.refresh);

router.post("/professional", ProfessionalController.add);
router.post("/user", verifyProfessionalMiddleware, ProfessionalController.registerUser);
router.delete("/user", verifyProfessionalMiddleware, ProfessionalController.deleteClient);

router.get("/moodentry", verifyUserMiddleware, MoodEntryController.filter);
router.get("/moodentry", verifyUserMiddleware, MoodEntryController.all);
router.post("/moodentry", verifyUserMiddleware, MoodEntryController.add);

router.get("/task", verifyUserMiddleware, TaskController.all);
router.post("/task", verifyProfessionalMiddleware, TaskController.add);
router.put("/task/user", verifyUserMiddleware, TaskController.update);
router.delete("/task", verifyProfessionalMiddleware, TaskController.deleteTask);

// Dev routes
if (process.env.NODE_ENV === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
