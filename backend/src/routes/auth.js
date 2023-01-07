const authRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authAdmin } = require("../middlewares/auth");
const { sendMail } = require("../utils/sendMail");
const { validateRegister, validateLogin } = require("../validators/auth");

authRouter.get("/users/", authAdmin, async (req, res) => {
  const user = await User.find({}, "-password");
  const usersNotAdmin = user.filter((item) => item.isAdmin != true);
  res.status(200).json({ status: "OK", data: usersNotAdmin });
});

authRouter.get("/users/:id", authAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, "-password");
    res.status(200).json({ status: "OK", data: user });
  } catch (error) {
    res.status(404).json({
      status: "NOT FOUND",
      data: { error: "this product not exists" },
    });
  }
});

authRouter.post("/register", validateRegister, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "this user already exists" } });
  }

  if (req.body.password != req.body.confirmPassword) {
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "passwords not match" } });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
  });
  const result = await user.save();
  const { password, ...data } = await result.toJSON();
  await sendMail(
    process.env.ADMIN_EMAIL,
    "User created",
    `<h1 style="font-weight:bold;">User created!</h1>
    <div style="width:fit-content;background-color:#C6e5b1;padding:20px;border-radius:10px">
    <div style="font-weight:bold;font-size:18px;">Fullname: ${data.fullname}</div>
    <div style="font-weight:bold;font-size:18px;">Email: ${data.email}</div>
    <div style="font-weight:bold;font-size:18px;">Phone number: ${data.phoneNumber}</div>
    <div>`
  );
  res.status(200).json({ status: "OK", data });
});

authRouter.post("/login", validateLogin, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "FAILED", data: { error: "user not found" } });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res
      .status(400)
      .json({ status: "FAILED", data: { error: "invalid credentials" } });
  }
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin ? user.isAdmin : false },
    process.env.SECRET
  );
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: process.env.TIME_SESSION,
  });

  const { password, ...data } = await user.toJSON();
  res.status(200).json({ status: "OK", data });
});

authRouter.get("/user", async (req, res) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, process.env.SECRET);

    if (!claims) {
      return res
        .status(401)
        .json({ status: "FAILED", data: { error: "unauthenticated" } });
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    res.json(data);
  } catch (error) {
    return res
      .status(401)
      .json({ status: "FAILED", data: { error: "unauthenticated" } });
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ status: "OK" });
});

module.exports = authRouter;
