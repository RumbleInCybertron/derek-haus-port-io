import Layout from "@/components/Layout";
import { CryptoProps } from "@/components/Crypto";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const crypto = await prisma.crypto.findUnique({
    where: {
      id: String(params?.id)
    },
  });
  return {
    props: [crypto],
  };
};

export const Crypto = (props: CryptoProps) => {
  return (
    <Layout>
      <div className="p-2">
        {props.ticker}
        {props.price}
          <ReactMarkdown>{props.name}</ReactMarkdown>
      </div>
    </Layout>
  )
}