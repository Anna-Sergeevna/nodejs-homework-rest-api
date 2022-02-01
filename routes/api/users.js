const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { joiUserSchema, joiSubscriptionSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

router.post("/login", validation(joiUserSchema), ctrlWrapper(ctrl.loginUser));

// router.patch(
//   "/subscription",
//   validation(joiSubscriptionSchema),
//   ctrlWrapper(ctrl.updateSubscriptionUser)
// );

module.exports = router;
