const express = require("express");

const { ctrlWrapper, validation } = require("../../middlewares");
const ctrl = require("../../controllers/users");
const { joiUserSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(joiUserSchema), ctrlWrapper(ctrl.signupUser));

module.exports = router;
