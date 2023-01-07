const express = require("express");
const { Server: SocketServer } = require("socket.io");
const http = require("http");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Message = require("../src/models/message");

require("dotenv").config({
  path: path.resolve(
    __dirname,
    process.env.MODO == "dev" ? ".env.dev" : ".env.prod"
  ),
});

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to the database");
  }
);

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const categoryRouter = require("./routes/category");
const ordersRouter = require("./routes/orders");
const chatRouter = require("./routes/chat");
app.use("/api/auth", authRouter);
app.use("/productos", productRouter);
app.use("/carrito", cartRouter);
app.use("/categorias", categoryRouter);
app.use("/ordenes", ordersRouter);
app.use("/chat", chatRouter);

let users = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  socket.on("user_connected", (username) => {
    users[username] = socket.id;
    io.emit("user_connected", username);
    console.log(users);
  });
  socket.on("send_message", async (data) => {
    let socketId = users[data.receiver];
    const message = new Message({
      email: data.type == "usuario" ? data.sender : data.receiver,
      type: data.type,
      datetime: Date.now(),
      body: data.message,
      read: false,
    });
    await message.save();
    io.to(socketId).emit("new_message", data);
  });
});

server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
