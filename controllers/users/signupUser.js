const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models");

const signupUser = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, avatarURL, email, subscription });
  newUser.setPassword(password);
  newUser.save();

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
