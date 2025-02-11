import jwt, { Secret } from "jsonwebtoken";

const generateToken = (
  payload: { email: string; role: string },
  secret: Secret,
  expiresIn: any
) => {
  const token = jwt.sign(
    {
      email: payload.email,
      role: payload.role,
    },
    secret as string,
    {
      algorithm: "HS256",
      expiresIn: expiresIn,
    }
  );
  return token;
};

export default generateToken;
