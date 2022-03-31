const signupUser = require("./signupUser");
const verificationToken = require("./verificationToken");
const verifyUser = require("./verifyUser");
const loginUser = require("./loginUser");
const getCurrentUser = require("./getCurrentUser");
const updateSubscriptionUser = require("./updateSubscriptionUser");
const uploadAvatar = require("./uploadAvatar");
const logoutUser = require("./logoutUser");

module.exports = {
  signupUser,
  verificationToken,
  verifyUser,
  loginUser,
  getCurrentUser,
  updateSubscriptionUser,
  uploadAvatar,
  logoutUser,
};
