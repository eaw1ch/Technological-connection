const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const profileController = require("../controllers/profileController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);
router.get("/activate/:link", userController.activate);

router.get("/getSubmittedApp", userController.getSubmittedApp);
router.get("/getInfo", userController.getInfo);
router.get("/getCountApp", userController.getCountApp);
router.post("/getFeedback", userController.getFeedback);

router.post("/app", authMiddleware, userController.application);
router.get(
  "/getConnectionTypes",
  authMiddleware,
  userController.getConnectionTypes
);
router.get("/getCompanies", authMiddleware, userController.getCompanies);

router.post(
  "/setPersonalData",
  authMiddleware,
  profileController.setPersonalData
);
router.get(
  "/getPersonalData",
  authMiddleware,
  profileController.getPersonalData
);
router.get("/checkProfile", authMiddleware, profileController.checkProfile);

module.exports = router;
