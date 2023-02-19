import { getSession } from "next-auth/react";
import { prisma } from '@/lib/prisma';

export default async function handle(req: any, res: any) {
  const { name, ticker, index, price } = req.body;

  const session = await getSession({ req });
  const result = await prisma.stock.create({
    data: {
      name: name,
      ticker: ticker,
      index: index,
      price: price,
    },
  });
  res.json(result);
}