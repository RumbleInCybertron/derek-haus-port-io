import Layout from "@/components/Layout";
import { StockProps } from "@/components/Stock";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stock = await prisma.stock.findUnique({
    where: {
      id: String(params?.id)
    },
  });
  return {
    props: [stock],
  };
};

const Stock: React.FC<StockProps> = (props) => {
  return (
    <Layout>
      <div className="p-2">
      {props.index}: {props.ticker}
      {props.price}
        <ReactMarkdown>{props.name}</ReactMarkdown>
      </div>
    </Layout>
  )
}

export default Stock