import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { id: team.productOwnerUserId! },
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { id: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
          ...team,
          productOwnerUsername: productOwner?.username || "N/A",
          projectManagerUsername: projectManager?.username || "N/A"
        };
      })
    );
    res.json(teamsWithUsernames);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: `Error retrieving teams: ${error.message}` });
  }
};
