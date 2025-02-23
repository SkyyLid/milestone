import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: `Error retrieving users: ${error.message}` });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const {param} = req.params;
  const id = Number(param);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: `Error retrieving user: ${error.message}` });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      profile_pic = "defaultpfp.jpg",
      recoveryCode = "",
    } = req.body;
    
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        profile_pic,
        recovery_code: recoveryCode,
      },
    });
    res.json({ message: "User created successfully:", newUser });
  } catch (error: any) {
    res.status(500).json({ error: `Error retrieving users: ${error.message}` });
  }
};
