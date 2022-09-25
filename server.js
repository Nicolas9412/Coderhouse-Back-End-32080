const express = require("express");
const { engine } = require("express-handlebars");
const PORT = 8080;
const ApiProductosMock = require("./api/productos");
const { chatsDaos: Chats } = require("./src/daos/mainDaos");

//
const chatBD = new Chats();
const apiProductos = new ApiProductosMock();

//
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

//
httpServer.listen(process.env.PORT || PORT, () => console.log("SERVER ON"));
httpServer.on("error", (error) => console.log(`Error en el servidor ${error}`));

//
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion del motor HANDLEBARS
app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);

let productos = [];
let chat = [];

app.get("/", async (req, res) => {
  chat = await chatBD.getAll();
  res.render("form-list-chat", { chat });
});

app.get("/api/productos-test", async (req, res) => {
  productos = apiProductos.popular();
  res.render("table-productos", { productos });
});

io.on("connection", (socket) => {
  console.log("Usuario Conectado" + socket.id);
  socket.on("producto", async (data) => {
    await productosBD.insert(data);
    productos = await productosBD.selectAll();
    io.sockets.emit("producto-row", data);
  });
  socket.on("mensaje", async (data) => {
    await chatBD.save(data);
    chat = await chatBD.getAll();
    io.sockets.emit("chat", chat);
  });
});
