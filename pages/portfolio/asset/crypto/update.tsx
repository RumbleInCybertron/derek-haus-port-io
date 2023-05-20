import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from '@/components/Layout';

const Draft: NextPage = () => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(0.00);
  const [amount, setAmount] = useState(0.00);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, ticker, price, amount };
      await fetch('/api/portfolio/asset/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/portfolio/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center p-3">
        <form onSubmit={submitData}>
          <h1>Add Crypto/Amount</h1>
          <div>
            <label htmlFor="name">Name *</label>
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 'Bitcoin'"
              type="text"
              value={name}
              className="text-black mb-2"
            />
            <label htmlFor="ticker">Ticker *</label>
            <input
              autoFocus
              onChange={(e) => setTicker(e.target.value)}
              placeholder="'BTC'"
              type="text"
              value={ticker}
              className="text-black mb-2"
            />
            <label htmlFor="price">Price *</label>
            <input
              autoFocus
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="'$123.45'"
              type="number"
              value={price}
              className="text-black mb-4"
            />
            <label htmlFor="amount">Number of Tokens *</label>
            <input
              autoFocus
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="'12345.23'"
              type="number"
              value={amount}
              className="text-black mb-4"
            />
            <input disabled={!name || !ticker || !price || !amount} type="submit" value="Submit" />
          </div>
          <a href="#" onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;