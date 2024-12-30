import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.splie(" ")[1];
    const secret = process.env.SECRET || "Sewoyebaa";
    const decodedToken = jwt.verify(token, secret);

    req.body.userId = decodedToken.userId;

    next();
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};
