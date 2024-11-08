import Layout from "@/components/Layout";
import { Portfolio, PortfolioProps } from "@/components/Portfolio";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";

export const Portfolios = () => {
  const {data: session, status} = useSession();
  const [portfolioData, setPortfolioData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await fetch(`/api/portfolios/${session?.user?.email}`)
        setPortfolioData(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    const result = callApi().catch(console.error);
    console.log(result);
  }, [session?.user?.email]);

  return (
    <Layout>
      <div className="m-2 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Portfolios
        {portfolioData.length < 1
          ? (
            <div>
              <div className="p-2 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">No portfolios here. Would you like to add one?</div>
            </div>
          )
          : (
            portfolioData.map((portfolio: PortfolioProps, i) => (
              <div key={i} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
                <Portfolio {...portfolio} />
              </div>
            ))
          )}
        <button onClick={() => Router.push("/portfolio/create")}>+ add</button>
      </div>
    </Layout>
  );
};

export default Portfolios;