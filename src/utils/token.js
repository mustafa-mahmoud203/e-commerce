import jwt from "jsonwebtoken";

export const jwtSign = ({ payload = {} }) => {
  const token = jwt.sign(payload, process.env.TOKEN_SIGNTURE, {
    expiresIn: "90d",
  });
  return token;
};

export const jwtVerify = ({ token = "" }) => {
  const decode = jwt.verify(token, process.env.TOKEN_SIGNTURE);
  return decode;
};
