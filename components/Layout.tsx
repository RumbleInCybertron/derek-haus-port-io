import Head from "next/head";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <title>Port IO</title>
      </Head>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};