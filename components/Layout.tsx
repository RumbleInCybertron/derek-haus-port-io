// import React, { ReactNode } from "react";
import Header from "./Header";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};