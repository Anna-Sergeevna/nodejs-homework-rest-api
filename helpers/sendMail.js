const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const msg = { ...data, from: "4042808@gmail.com" };
  await sgMail
    .send(msg)
    .then(() => console.log("Email send success"))
    .catch((error) => console.log(error.message));

  return true;
};

module.exports = sendMail;
