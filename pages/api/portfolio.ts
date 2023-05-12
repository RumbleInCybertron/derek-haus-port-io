import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req});
  if(req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { email: String(session?.user?.email) }
    });
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: user?.id, id: String(req.query.id) },
      include: {
        stockAssets: { select: { name: true, shares: true, average: true, id: true } },
        cryptoAssets: { select: { name: true, amount: true, id: true } }
      }
    });
    res.status(200).json(portfolio);
  };
};