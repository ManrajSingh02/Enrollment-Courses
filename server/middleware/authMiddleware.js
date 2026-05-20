import jwt from "jsonwebtoken";

export const protect = (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    const token =
      authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    if (!token) {
      return res.status(401).json({
        message: "No token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
