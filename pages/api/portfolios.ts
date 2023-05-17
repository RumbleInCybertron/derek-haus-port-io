// import { prisma } from "@/lib/prisma";
// import { getSession } from "next-auth/react";
// import { NextApiRequest, NextApiResponse } from "next/types";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const session = await getSession({req});
//   console.log("Request: ", req);
//   if(req.method === 'GET') {
//     const user = await prisma.user.findUnique({
//       where: { email: String(session?.user?.email) }
//     });
//     const portfolios = await prisma.portfolio.findMany({
//       where: { userId: user?.id },
//       include: {
//         stockAssets: { select: { name: true, shares: true, average: true, id: true } },
//         cryptoAssets: { select: { name: true, amount: true, id: true } }
//       }
//     });
//     // console.log("Portfolios: ", portfolios);
//     res.status(200).json(portfolios);
//   };
// };