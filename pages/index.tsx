import Stock, { StockProps } from "@/components/Stock";
import { prisma } from "@/lib/prisma";
import { GetStaticProps } from "next";
import Layout from "../components/Layout"

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.stock.findMany({
    select: { index: true, price: true, id: true, ticker: true, name: true}
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
          {props.feed.map((stock) => (
            <div key={stock.id} className="stock">
              <Stock stock={stock} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .stock {
          background: purple;
          transition: box-shadow 0.1s ease-in;
        }

        .stock:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .stock + .stock {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default StockFeed;