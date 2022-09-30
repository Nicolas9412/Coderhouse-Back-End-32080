const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () =>
  console.log(`Servidor levantado http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Hola");
});
