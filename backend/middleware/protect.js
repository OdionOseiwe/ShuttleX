import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.cookies["auth_token"]; // read JWT from cookie

  if (!token) {
    return res.status(401).json({ success: false, msg: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // attach userId
    next();
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Token invalid or expired" });
  }
};
