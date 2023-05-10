import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { Portfolio } from "@/components/Portfolio";

const Portfolios = () => {
  const { data: session } = useSession();

  const user = await prisma.user.findUnique({
    where: { email: String(session?.user?.email) }
  });
  const portfolios = await prisma.portfolio.findMany({
    where: { userId: user?.id },
    select: { id: true, name: true }
  });

  return (
    <Layout>
      <div>
        Portfolios
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
            <Portfolio {...portfolio} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Portfolios;