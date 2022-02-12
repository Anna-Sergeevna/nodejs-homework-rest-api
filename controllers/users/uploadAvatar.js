const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const uploadAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  try {
    const [extention] = filename.split(".").reverse();
    const newFileName = `${_id}.${extention}`;
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", newFileName);
    await User.findByIdAndUpdate(_id, { avatarURL });

    await Jimp.read(resultUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(200).json({
      status: "success",
      code: 200,
      avatarURL,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = uploadAvatar;
