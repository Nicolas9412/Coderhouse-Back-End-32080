const log4js = require("../../logger");
const twilio = require("twilio");

//Logger
const loggerArchivoError = log4js.getLogger("archivoError");

const ACCOUNT_SID = "ACd114779881c74f77cf768cbb0cd21379";
const AUTH_TOKEN = "49200c8b86a80d3251168da02fd450c3";
const PHONE_NUMBER = "whatsapp:+14155238886";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendWhatsapp = async (body) => {
  try {
    await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: `whatsapp:+5493513811640`,
    });
  } catch (e) {
    loggerArchivoError.error(e);
  }
};

module.exports = sendWhatsapp;
