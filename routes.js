function getRoot(req, res) {
  res.render("index", {});
}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    if (!req.session["login"]) {
      req.session["login"] = {};
      req.session["login"].username = username;
    }
    res.render("pages/vistaProductos.ejs", { user });
  } else {
    res.render("pages/login.ejs");
  }
}

function getSignup(req, res) {
  if (req.isAuthenticated()) {
    const { username, password } = req.user;
    const user = { username, password };
    res.render("pages/vistaProductos.ejs", { user });
  } else {
    res.render("pages/register.ejs");
  }
}

function postLogin(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/vistaProductos.ejs", { user });
}

function postSignup(req, res) {
  const { username, password } = req.user;
  const user = { username, password };
  res.render("pages/vistaProductos.ejs", { user });
}

function getFaillogin(req, res) {
  res.render("pages/login-error", {});
}

function getFailsignup(req, res) {
  res.render("pages/signup-error", {});
}

function getLogout(req, res) {
  if (req.isAuthenticated()) {
    const { username } = req.user;
    req.logout(() => {
      req.session.destroy((err) => {
        if (err) {
          return res.json({ status: "Logout ERROR", body: err });
        }
        res.render("pages/logout.ejs", { username });
      });
    });
  }
}

function failRoute(req, res) {
  res.status(404).render("pages/routing-error", {});
}

module.exports = {
  getRoot,
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  getFaillogin,
  getFailsignup,
  getLogout,
  failRoute,
};
