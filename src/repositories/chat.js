const parseArgs = require("minimist");
const args = parseArgs(process.argv.slice(2));
const MensajesFactoryDAO = require("../daos/mensajes/MensajesFactory");
const Chat = require("./classes/Chat");

let instance = null;

class MensajesRepo {
  constructor() {
    this.dao = MensajesFactoryDAO.get(args.p || process.env.TYPE_PERSIST);
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajesRepo();
    }
    return instance;
  }
  async save(obj) {
    const dto = new Chat(obj);
    return this.dao.save(dto);
  }
  async getById(id) {
    const dto = await this.dao.getById();
    return new Chat(dto);
  }
  async getAll() {
    const dtos = await this.dao.getAll();
    return dtos.map((dto) => new Chat(dto));
  }
  async deleteById(id) {
    return await this.dao.deleteById(id);
  }
  async modify(id, replace) {
    const dto = await this.dao.modify(id, replace);
    return new Chat(dto);
  }
}

module.exports = MensajesRepo;
