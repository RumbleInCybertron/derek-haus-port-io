import { prisma } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export const Portfolios = async () => {
  const {data: session } = useSession();
  const user = await prisma.user.findUnique({
    where: { email: String(session?.user?.email) }
  });
  return await prisma.portfolio.findMany({
    where: { userId: user?.id },
    select: { id: true, name: true }
  });
}