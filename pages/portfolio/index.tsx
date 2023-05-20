import Layout from "@/components/Layout";
import { CryptoAsset, CryptoAssetProps, StockAsset, StockAssetProps } from "@/components/portfolio/Asset";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Portfolio {
  id: string;
  name: string;
  stockAssets?: StockAssetProps[];
  cryptoAssets?: CryptoAssetProps[];
}

export const Portfolio = ({ id, name, stockAssets, cryptoAssets }: Portfolio) => {
  const router = useRouter();
  const [data, setData] = useState<Portfolio>({ id: "", name: "", stockAssets: [], cryptoAssets: [] });

  const refreshData = () => {
    router.replace(router.asPath)
  }

  useEffect(() => {
    const callApi = async () => {
      try {
        const id = await router.query.id;
        const res = await fetch(`/api/portfolio/${id}`);
        console.log("Response: ", res);
        setData(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    const result = callApi().catch(console.error);
    // console.log("Result: ", result);
  }, [router.query.id]);

  return (
    <Layout>
      <div>
        Portfolio
        <div>{data.name}
          {data.stockAssets !== undefined && data.stockAssets.length > 1
            ? (
              data.stockAssets?.map((stockAsset: StockAssetProps, i) => (
                <div key={i}>
                  <StockAsset {...stockAsset} />
                </div>
              )))
            : (
              <div>No Stock Assets in this Portfolio</div>
            )}
          {data.cryptoAssets !== undefined && data.cryptoAssets.length > 1
            ? (
              data.cryptoAssets?.map((cryptoAsset: CryptoAssetProps, i) => (
                <div key={i}>
                  <CryptoAsset {...cryptoAsset} />
                </div>
              )))
            : (
              <div>No Crypto Assets in this Portfolio</div>
            )}
          <button className="m-2 w-1/3" onClick={() => Router.push({ pathname: "/portfolio/asset/stock/update", query: { portfolioId: data.id } }, "/portfolio/asset/stock/update")}>+ Add/Update Stock Assets</button>
          <button className="m-2 w-1/3" onClick={() => Router.push("/portfolio/asset/crypto/update")}>+ Add/Update Crypto Assets</button>
        </div>
        {/* <StockAsset id={portfolio.id} name={portfolio.name} ticker={portfolio.ticker} amount={portfolio.amount} average={portfolio.average} updatedAt={portfolio.updatedAt} /> */}
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
};

export default Portfolio;