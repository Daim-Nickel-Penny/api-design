import jwt from "jsonwebtoken";

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
