import jwt from "jsonwebtoken";

export function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "no token provided" });
  }
  const token = authHeader.split(" ")[1];
  const secret = process.env.SECRET_KEY;
  try {
    const result = jwt.verify(token, secret);
    req.user = result;
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
}
