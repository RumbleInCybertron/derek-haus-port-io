import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

export type CryptoProps = {
  id: string;
  name: string;
  ticker: string;
  price: number;
};

export const Crypto = ({id, name, ticker, price}: CryptoProps) => {
  return (
    <div onClick={() => Router.push("/stock/[id]", `/stock/${id}`)}>
      <small>{name}: {ticker} </small>
      <small>${price}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
    </div>
  )
}

export default Crypto;