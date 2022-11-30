const { getProducts } = require("../servicies/products");
const { getChat } = require("../servicies/chat");

async function getHome(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  const productos = await getProducts();
  const chat = await getChat();
  res.render("pages/form-list-chat.ejs", { user, productos, chat });
}

module.exports = { getHome };
