const express = require("express");

const { ctrlWrapper, validation, validateToken } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { joiUserSchema, joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

router.get("/current", validateToken, ctrlWrapper(ctrl.getCurrentUser));

router.get("/logout", validateToken, ctrlWrapper(ctrl.logoutUser));

router.patch(
  "/current/subscription",
  validateToken,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscriptionUser)
);

module.exports = router;
