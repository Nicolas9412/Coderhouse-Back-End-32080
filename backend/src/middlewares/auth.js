const jwt = require("jsonwebtoken");

function auth(request, response, next) {
  const authHeader = request.headers.authorization;

  console.log(authHeader);

  if (!authHeader) {
    return response.status(401).json({
      error: "not authenticated",
    });
  }

  let token = null;

  if (authHeader && authHeader.toLowerCase().startsWith("bearer")) {
    token = authHeader.split(" ")[1];
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return response.status(403).json({
        error: "not authorized",
      });
    }

    request.user = decoded.data;
    next();
  });
}

module.exports = { auth };
