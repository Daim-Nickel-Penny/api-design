import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const comparePaswords = (password, hash) => {
  //compare plain text password to hashed password
  // for sign-in
  return bcrypt.compare(password, hash);
};

export const hashPasword = (password) => {
  //used to hash the first time password
  return bcrypt.hash(password, 5);
};

export const createJWT = (user) => {
  //converting object to string

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },

    process.env.JWT_SECRET
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ msg: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ msg: "not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
    res.status(401);
    res.json({ msg: "not authorized" });
    return;
  }
};
