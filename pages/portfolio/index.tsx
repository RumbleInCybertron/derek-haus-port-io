import { Crypto, CryptoProps } from "@/components/Crypto";
import Layout from "@/components/Layout";
import { Stock, StockProps } from "@/components/Stock";
import { prisma } from "@/lib/prisma";
import { GetStaticProps } from "next/types";

export const getStaticProps: GetStaticProps = async () => {
  const stocks = await prisma.stock.findMany({
    select: { index: true, price: true, id: true, ticker: true, name: true }
  });
  const cryptos = await prisma.crypto.findMany({
    select: { price: true, id: true, ticker: true, name: true }
  });

  return {
    props: { stocks, cryptos },
    revalidate: 10,
  }
}

type Props = {
  stocks: StockProps[],
  cryptos: CryptoProps[]
};

const AssetList = ({ stocks, cryptos }: Props) => {
  return (
    <Layout>
      <div>
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
      </div>
    </Layout>
  )
}

export default AssetList;