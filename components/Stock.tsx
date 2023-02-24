import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type StockProps = {
  id: string;
  name: string;
  ticker: string;
  index: string;
  price: number;
};

const Stock: React.FC<{ stock: StockProps }> = ({ stock }) => {
  return (
    <div onClick={() => Router.push("/stock/[id]", `/stock/${stock.id}`)}>
      <small>{stock.name}: {stock.ticker} </small>
      <small>${stock.price}</small>
      <ReactMarkdown>{stock.name}</ReactMarkdown>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Stock;