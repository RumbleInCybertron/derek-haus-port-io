import Layout from "@/components/Layout";
import { PortfolioProps } from "@/components/Portfolio";
import { StockAsset } from "@/components/portfolio/Asset";


const callApi = async (id: string) => {
  try {
    const res = await fetch(`/api/portfolio/${id}`)
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

type Props = {
  portfolio: PortfolioProps[],
};

const AssetList = async () => {
  const portfolio = await callApi("");

  return (
    <Layout>
      <div>
        <StockAsset id={portfolio.id} name={portfolio.name} ticker={portfolio.ticker} shares={portfolio.shares} average={portfolio.average} updatedAt={portfolio.updatedAt} />
      </div>
      {/* <div>
        {stocks.length < 1 ? null : <h1>Stocks</h1>}
        {stocks.map((stock) => (
          <div key={stock.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
            <Stock {...stock} />
          </div>
        ))}
        {cryptos.length < 1 ? null : <h1>Crypto</h1>}
        {cryptos.map((crypto) => (
          <div key={crypto.id}>
            <Crypto {...crypto} />
          </div>
        ))}
      </div> */}
    </Layout>
  )
}

export default AssetList;