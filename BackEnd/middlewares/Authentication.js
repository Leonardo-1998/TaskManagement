const { verifyToken } = require("../utils/JWT");

const authentication = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const error = new Error("Token tidak valid atau kadaluwarsa");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const payload = verifyToken(token);

    req.user = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
