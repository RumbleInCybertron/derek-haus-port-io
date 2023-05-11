import Layout from "@/components/Layout";
import { Portfolio, PortfolioProps } from "@/components/Portfolio";
import { useEffect, useState } from "react";

export const Portfolios = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await fetch(`/api/portfolios/`)
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
      <div>
        Portfolios
        {portfolioData.map((portfolio: PortfolioProps) => (
          <div key={portfolio.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
            <Portfolio {...portfolio} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Portfolios;