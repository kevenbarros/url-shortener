const jwt = require("jsonwebtoken");

function generateToken(payload) {
  const token = jwt.sign(payload, "admin", {
    expiresIn: "1d",
  });

  return token;
}

module.exports = { generateToken };
