import { Stock, StockProps } from "@/components/Stock";
import { prisma } from "@/lib/prisma";
import { GetStaticProps } from "next";
import Layout from "@/components/Layout"
import { BarChart } from "@/components/BarChart"
import { DonutChart } from "@/components/DonutChart";
import { StockData } from "@/components/StockData";
// import LineChart from "@/components/LineChart";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.stock.findMany({
    select: { index: true, price: true, id: true, ticker: true, name: true }
  });

  return {
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: StockProps[]
}

const StockFeed = ({ feed }: Props) => {
  return (
    <Layout>
      <div>
        <h1>Stock</h1>
        {feed.map((stock) => (
          <div key={stock.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
            <Stock {...stock} />
          </div>
        ))}
      </div>
      {/* <BarChart />
      <DonutChart />
      <StockData /> */}
      {/* <LineChart /> */}
    </Layout>
  )
}

export default StockFeed;