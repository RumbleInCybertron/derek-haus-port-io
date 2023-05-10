import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type PortfolioProps = {
  id: string;
  name: string;
};

export const Portfolio = ({id, name}: PortfolioProps) => {
  return (
    <div onClick={() => Router.push("/portfolio/[id]", `/portfolio/${id}`)}>
      <small>{name}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
    </div>
  )
}

export default Portfolio;