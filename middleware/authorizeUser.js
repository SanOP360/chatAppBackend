
const jwt = require("jsonwebtoken");
const jwtSecretKey = "dummy_secret_key";

exports.authorizeUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, jwtSecretKey, (err, user) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
