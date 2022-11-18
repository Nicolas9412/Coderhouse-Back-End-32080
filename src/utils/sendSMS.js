const twilio = require("twilio");

const ACCOUNT_SID = "ACd114779881c74f77cf768cbb0cd21379";
const AUTH_TOKEN = "49200c8b86a80d3251168da02fd450c3";
const PHONE_NUMBER = "+19803858471";

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body, PHONE_CLIENT) => {
  try {
    console.log(PHONE_CLIENT);
    const message = await client.messages.create({
      body,
      from: PHONE_NUMBER,
      to: PHONE_CLIENT,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = sendSMS;
