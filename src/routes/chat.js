const chatRouter = require("express").Router();
const { authAdmin, auth } = require("../middlewares/auth");
const Message = require("../models/message");
const User = require("../models/user");

chatRouter.get("/:email", auth, async (req, res) => {
  const { email } = req.params;
  try {
    const messages = await Message.find({ email }).sort({ datetime: "asc" });
    res.status(200).json({ status: "OK", data: messages });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

chatRouter.get("/messages/last", authAdmin, async (req, res) => {
  try {
    const user = await User.find({}, "-password");
    const usersNotAdmin = user.filter((item) => item.isAdmin != true);
    let messages = [];
    for (const user of usersNotAdmin) {
      const message = await Message.find({ email: user.email })
        .sort({
          datetime: "desc",
        })
        .limit(1);
      if (message[0] != null) messages.push(message[0]);
    }
    res.status(200).json({ status: "OK", data: { messages } });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

chatRouter.post("/checkClient", auth, async (req, res) => {
  try {
    const messages = await Message.find({
      email: req.body.email,
      type: "sistema",
      read: false,
    });
    for (const msg of messages) {
      await Message.findByIdAndUpdate(msg._id, { read: true });
    }
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

chatRouter.post("/checkSystem", authAdmin, async (req, res) => {
  try {
    const messages = await Message.find({
      email: req.body.email,
      type: "usuario",
      read: false,
    });
    for (const msg of messages) {
      await Message.findByIdAndUpdate(msg._id, { read: true });
    }
    res.status(200).json({ status: "OK" });
  } catch (error) {
    res.status(500).json({ status: "FAILED", data: { error } });
  }
});

module.exports = chatRouter;
