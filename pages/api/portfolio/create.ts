import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({req});
    console.log("Session: ", session);
    console.log("Request: ", req);
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: String(session?.user?.email) },
      select: { id: true },
    });
    console.log("User ID: ", user);
    console.log("Name: ", req.body);
    const portfolio = await prisma.portfolio.create({
      data: { 
        userId: user.id, 
        name: req.body,
      },
    });
    res.status(200).json(portfolio);
};