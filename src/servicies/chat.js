//const { mensajesDaos: Chat } = require("../daos/mainDaos");
//const MensajesFactoryDAO = require("../daos/mensajes/MensajesFactory");
const ChatRepo = require("../repositories/chat");

const chatBD1 = ChatRepo.getInstance();
const chatBD2 = ChatRepo.getInstance();

console.log("Equals chat 1 y chat 2: ", chatBD1 === chatBD2);

async function getChat() {
  const chat = await chatBD1.getAll();
  return chat;
}

module.exports = { getChat };
