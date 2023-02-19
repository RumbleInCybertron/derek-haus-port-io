import Stock, { StockProps } from "@/components/Stock";
import { prisma } from "@/lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.userStock.findMany({
    where: { id: "cle5gj4fc0000lhjsby69klg6"},
    include: { stock: { select: { index: true, price: true, id: true, ticker: true, name: true}}}
  });

  return {
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: StockProps[]
}

const StockFeed: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Stock</h1>
        <main>
          {props.feed.map((userStock) => (
            <div key={userStock.id} className="userStock">
              <Stock userStock={userStock} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .userStock {
          background: purple;
          transition: box-shadow 0.1s ease-in;
        }

        .userStock:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .userStock + .userStock {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default StockFeed;