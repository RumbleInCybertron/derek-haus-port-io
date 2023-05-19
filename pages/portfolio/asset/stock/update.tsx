import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import Layout from '@/components/Layout';

const Draft: NextPage = () => {
  const [name, setName] = useState('');
  const [ticker, setTicker] = useState('');
  const [index, setIndex] = useState('');
  const [price, setPrice] = useState(0.00);
  const [amount, setAmount] = useState(0.00);

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { name, ticker, index, price, amount };
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await Router.push('/drafts');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center p-3">
        <form onSubmit={submitData}>
          <h1>Add Stock/Shares</h1>
          <div>
            <label htmlFor="name">Name *</label>
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 'Tesla Inc'"
              type="text"
              value={name}
              className="text-black mb-2"
            />
            <label htmlFor="ticker">Ticker *</label>
            <input
              autoFocus
              onChange={(e) => setTicker(e.target.value)}
              placeholder="'TSLA'"
              type="text"
              value={ticker}
              className="text-black mb-2"
            />
            <label htmlFor="index">Index *</label>
            <input
              autoFocus
              onChange={(e) => setIndex(e.target.value)}
              placeholder="'NASDAQ'"
              type="text"
              value={index}
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
            <label htmlFor="amount">Shares *</label>
            <input
              autoFocus
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              placeholder="'1.23'"
              type="number"
              value={amount}
              className="text-black mb-4"
            />
            <input disabled={!name || !ticker || !index || !price || !amount} type="submit" value="Create" />
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