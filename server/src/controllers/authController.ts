import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { email, password, username, recoveryCode } = req.body;

  try {
    if (!email || !password || !username) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userAlreadyExists) {
      res.status(400).json({ message: "User already exists with this email." });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedRecoveryCode = await bcrypt.hash(recoveryCode, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
        recovery_code: hashedRecoveryCode,
      },
    });
    res.status(200).json({ message: "User registered successfully" }),
      console.log(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(500).json({
      message: error,
    });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
  } catch (error) {
    console.log("Error in forgotPassword ", error);
    res.status(500).json({
      message: error,
    });
  }
};
