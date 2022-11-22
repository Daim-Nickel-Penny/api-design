import prisma from "../db";
import { hashPasword, createJWT, comparePaswords } from "../moudles/auth";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPasword(req.body.password),
    },
  });

  const token = createJWT(user);

  res.json({ token });
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePaswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ msg: "nope" });
  }

  const token = createJWT(user);

  res.json({ token });
};
