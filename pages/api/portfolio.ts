import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if(req.method === 'GET') {
    const port = await prisma.portfolio.findUniqueOrThrow({
      where: { id: String(id) },
      // select: {
      //   id: true,
      //   name: true,
      //   stockAssets: { select: { id: true, name: true, ticker: true, shares: true, average: true, updatedAt: true }},
      //   cryptoAssets: { select: { id: true, name: true, ticker: true, amount: true, average: true, updatedAt: true } },
      // }
    });
    res.status(200).json(port);
  };
};