import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type StockProps = {
  id: string;
  shares: number;
  stock: {
    id: string;
    name: string;
    ticker: string;
    index: string;
    price: number;
  }
};

const Stock: React.FC<{ userStock: StockProps }> = ({ userStock }) => {
  return (
    <div onClick={() => Router.push("/stock/[id]", `/stock/${userStock.id}`)}>
      <small>{userStock.stock.name}: {userStock.stock.ticker} </small>
      <small>${userStock.stock.price}</small>
      <div><small>Shares: {userStock.shares}</small></div>
      <ReactMarkdown>{userStock.stock.name}</ReactMarkdown>
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