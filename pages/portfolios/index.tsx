import Layout from "@/components/Layout";
import { Portfolio, PortfolioProps } from "@/components/Portfolio";
import Router from "next/router";
import { useEffect, useState } from "react";

export const Portfolios = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await fetch('/api/portfolios/')
        setPortfolioData(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    const result = callApi().catch(console.error);
    console.log(result);
  }, []);

  return (
    <Layout>
      <div className="m-2 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Portfolios
        {portfolioData.length < 1
          ? (
            <div>
              <div className="p-2 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">No portfolios here. Would you like to add one?</div>
              <button onClick={() => Router.push("/portfolio/update")}>+ add</button>
            </div>
          )
          : (
            portfolioData.map((portfolio: PortfolioProps) => (
              <div key={portfolio.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
                <Portfolio {...portfolio} />
              </div>
            ))
          )}
      </div>
    </Layout>
  );
};

export default Portfolios;