const { Request, Response, NextFunction } = require("express");
const { config } = require("../config/config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");



const authMiddleware = async (req, res, next) => {
  let token = String(req?.headers?.token || "");
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

      next();
    });
  } else {
    return res.status(401).json({
      messagem: "Unauthorized",
    });
  }
};

module.exports = authMiddleware;
