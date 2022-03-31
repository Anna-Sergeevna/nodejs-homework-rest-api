const { BadRequest } = require("http-errors");

const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const verifyUser = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const msg = {
    to: email,
    subject: "Confirm your email",
    html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Click to verify your email</a>`,
  };
  sendMail(msg);

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Verification email sent",
    data: {
      user: {
        name: user.name,
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = verifyUser;
