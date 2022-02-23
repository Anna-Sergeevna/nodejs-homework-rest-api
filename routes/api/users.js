const express = require("express");

const {
  ctrlWrapper,
  validation,
  validateToken,
  upload,
} = require("../../middlewares");
const ctrl = require("../../controllers/users");
const {
  joiUserSchema,
  joiSubscriptionSchema,
  verifyEmailSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verificationToken));

router.post(
  "/verify",
  validation(verifyEmailSchema),
  ctrlWrapper(ctrl.verifyUser)
);

router.get("/current", validateToken, ctrlWrapper(ctrl.getCurrentUser));

router.patch(
  "/current/subscription",
  validateToken,
  validation(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscriptionUser)
);

router.patch(
  "/avatars",
  validateToken,
  upload.single("avatar"),
  ctrlWrapper(ctrl.uploadAvatar)
);

router.get("/logout", validateToken, ctrlWrapper(ctrl.logoutUser));

module.exports = router;
