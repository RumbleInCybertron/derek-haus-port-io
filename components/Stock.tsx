import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
// import GoogleFinance from 'google-finance';
 

// const symbol = "NASDAQ:AAPL";
// const from = "2020-01-01";
// const to = "2023-03-16";

// const stockNews = googleFinance.companyNews({symbol});
 
// const stockHist = googleFinance.historical({symbol, from, to });
// console.log("Apple Stock News: ", stockNews);
// console.log("Apple Stock History: ", stockHist);

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