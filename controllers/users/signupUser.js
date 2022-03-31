const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { sendMail } = require("../../helpers");

const signupUser = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const newUser = new User({
    name,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();

  const msg = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Click to verify your email</a>`,
  };
  await sendMail(msg);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
      },
    },
  });
};

module.exports = signupUser;
