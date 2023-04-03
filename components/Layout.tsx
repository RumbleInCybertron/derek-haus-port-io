// import React, { ReactNode } from "react";
import Header from "./Header";

interface Props {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};