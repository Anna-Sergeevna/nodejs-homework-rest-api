const { Conflict } = require("http-errors");
// const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const signupUser = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`Email "${email}" in use`);
  }

  const newUser = new User({ name, email, subscription });
  newUser.setPassword(password);
  newUser.save();

  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // const result = await User.create({
  //   name,
  //   email,
  //   password: hashPassword,
  //   subscription,
  // });

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
