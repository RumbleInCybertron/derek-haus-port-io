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
      {/* <BarChart />
      <DonutChart />
      <StockData /> */}
      {/* <LineChart /> */}
    </Layout>
  )
}

export default StockFeed;