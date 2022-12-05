//const { mensajesDaos: Chat } = require("../daos/mainDaos");
const MensajesFactoryDAO = require("../daos/mensajes/MensajesFactory");

const chatBD = MensajesFactoryDAO.get(process.env.TYPE_PERSIST);

async function getChat() {
  const chat = await chatBD.getAll();
  return chat;
}

module.exports = { getChat };
