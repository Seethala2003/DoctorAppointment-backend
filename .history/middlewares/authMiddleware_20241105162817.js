const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", success: false });
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
      if (err) {
        return res
          .status(401) // Changed from 200 to 401 for invalid token
          .send({ message: "Token is not valid", success: false });
      } else {
        req.userId = decode.id; // Set userId on req, not on req.body
        next();
      }
    });
  } catch (error) {
    console.error(error); 
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
