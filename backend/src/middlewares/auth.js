const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, process.env.SECRET);
    if (!claims) {
      return res
        .status(401)
        .json({ status: "FAILED", data: { error: "unauthenticated" } });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "FAILED", data: { error: "unauthenticated" } });
  }
}

function authAdmin(req, res, next) {
  try {
    const cookie = req.cookies["jwt"];
    const claims = jwt.verify(cookie, process.env.SECRET);

    if (!claims) {
      return res
        .status(401)
        .json({ status: "FAILED", data: { error: "unauhenticated" } });
    } else if (!claims.isAdmin) {
      return res
        .status(401)
        .json({ status: "FAILED", data: { error: "unauhenticated admin" } });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "FAILED", data: { error: "unauhenticated admin" } });
  }
}

module.exports = { auth, authAdmin };
