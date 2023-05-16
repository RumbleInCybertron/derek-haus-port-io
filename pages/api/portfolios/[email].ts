import { prisma } from "@/lib/prisma";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({req});
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { email: String(session?.user?.email) },
      select: {id: true},
    });
    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user!.id },
      select: {
        id: true,
        name: true,
        stockAssets: { select: { name: true, shares: true, average: true, id: true } },
        cryptoAssets: { select: { name: true, amount: true, id: true } }
      }
    });
    res.status(200).json(portfolios);
  };
};