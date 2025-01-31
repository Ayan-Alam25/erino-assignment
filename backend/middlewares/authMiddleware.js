import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized-invalid token" });
    }

    req.user = decode;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};
