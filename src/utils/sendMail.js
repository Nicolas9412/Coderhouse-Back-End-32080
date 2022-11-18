const log4js = require("../../logger");
const { createTransport } = require("nodemailer");

//Logger
const loggerArchivoError = log4js.getLogger("archivoError");

const sendMail = async (to, subject, content) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    from: `e-commerce <${process.env.ADMIN_EMAIL}>`,
    to: to ?? process.env.ADMIN_EMAIL,
    subject: subject,
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    loggerArchivoError.error(error);
  }
};

module.exports = sendMail;
