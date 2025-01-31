import jwt from "jsonwebtoken";

export const generateAccessToken = (res, user) => {
  const access_token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
  return access_token;
};
