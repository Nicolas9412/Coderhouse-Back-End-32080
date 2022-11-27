const { mensajesDaos: Chat } = require("../daos/mainDaos");

const chatBD = new Chat();

async function getChat() {
  const chat = await chatBD.getAll();
  return chat;
}

module.exports = { getChat };
