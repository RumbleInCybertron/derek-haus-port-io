import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

interface Asset {
  portfolioId: string;
  name: string;
  ticker: string;
  index: string;
  price: number;
  amount: number;
  average: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Request: ", req.body);
    const asset: Asset = {
      portfolioId: req.body.portfolioId, 
      name: req.body.name, 
      ticker: req.body.ticker, 
      index: req.body.index, 
      price: req.body.price, 
      amount: req.body.amount,
      average: req.body.average
    };
    if(req.body.type === "stock"){
      const stock = await prisma.stockAsset.upsert({
        where: { id: String(req.body.assetId) },
        update: { ...asset },
        create: { ...asset}
      });
      res.status(200).json(stock);
    } else if (req.body.type === "crypto") {
      const crypto = await prisma.cryptoAsset.upsert({
        where: { id: String(req.body.assetId) },
        update: { ...asset },
        create: { ...asset}
      });
      res.status(200).json(crypto);
    }
};