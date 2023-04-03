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

export const Stock = ({id, name, ticker, index, price}: StockProps) => {
  return (
    <div onClick={() => Router.push("/stock/[id]", `/stock/${id}`)}>
      <small>{name}: {ticker} </small>
      <small>${price}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
      {/* <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style> */}
    </div>
  )
}

export default Stock;