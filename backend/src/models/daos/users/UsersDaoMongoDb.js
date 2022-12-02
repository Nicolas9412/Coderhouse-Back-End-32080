const schemaUser = require("../../schemas/user");
const ContainerMongoDb = require("../../containers/ContainerMongoDb");

class UsersDaoMongoDb extends ContainerMongoDb {
  constructor() {
    super(schemaUser);
  }
}

module.exports = UsersDaoMongoDb;
