import jwt from "jsonwebtoken";
export const tokenCheck = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    req.user = result;
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid or expired token" });
  }
};
