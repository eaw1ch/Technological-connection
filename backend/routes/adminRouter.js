const Router = require("express");
const router = new Router();
const adminController = require("../controllers/adminController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.get("/showUsers", checkRole("ADMIN"), adminController.getAll);
router.get("/getAllApp", checkRole("ADMIN"), adminController.getAllApp);
router.post("/setAdmin", checkRole("ADMIN"), adminController.setAdmin);
router.post("/addCompany", checkRole("ADMIN"), adminController.addCompany);
router.post(
  "/getInfoApplication",
  checkRole("ADMIN"),
  adminController.getInfoApplication
);
router.post(
  "/submittingApp",
  checkRole("ADMIN"),
  adminController.submittingApp
);
// router.post("/rejectingApp", checkRole("ADMIN"), adminController.rejectingApp);

module.exports = router;
