const jwt = require("jsonwebtoken");
const User = require("../models/User");

const checkerToken = async (req, res, next) => {
  try {
    let token = String(req?.body?.headers?.token || "");
    if (token) {
      jwt.verify(token, "admin", async (error, decoded) => {
        if (error) {
          return res.status(403).json({
            message: error.message,
            error,
          });
        }
        const user = await User.findOne({ _id: decoded?.sub });

        if (!user)
          return res.status(403).json({
            messagem: "forBidden",
          });

        req.headers.user = decoded?.sub;

        return res.status(200).json({ sucess: true }); //everything it's working
      });
    } else {
      return res.status(401).json({
        messagem: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({ sucess: false });
  }
};
module.exports = { checkerToken };
