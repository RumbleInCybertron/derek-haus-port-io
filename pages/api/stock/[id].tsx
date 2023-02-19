import Layout from "@/components/Layout";
import { StockProps } from "@/components/Stock";
import prisma from "@/lib/prisma";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stock = await prisma.stock.findUnique({
    where: {
      id: String(params?.id)
    },
    include: {
      UserStock: {
        select: {shares: true},
      },
    },
  });
  return {
    props: [stock],
  };
};

const Stock: React.FC<StockProps> = (props) => {
  return (
    <Layout>
      <div>
      <small>{props.stock.index}: {props.stock.ticker}</small>
      <small>{props.stock.price}</small>
        <ReactMarkdown>{props.stock.name}</ReactMarkdown>
      </div>
      <style jsx>{`
        .page {
          background: blue;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Stock