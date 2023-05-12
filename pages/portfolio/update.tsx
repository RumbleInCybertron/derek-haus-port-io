import Layout from "@/components/Layout";
import Router from "next/router";
import { useState } from "react";


export const Add = () => {
  const [name, setName] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/portfolio/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(name),
      });
      await Router.push('/portfolios')
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center p-3">
        <form onSubmit={submitData}>
          <div>
            <label htmlFor="name">Name *</label>
            <input
              autoFocus
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 'Private Portfolio 001'"
              type="text"
              value={name}
              className="text-black mb-2"
            />
            <input disabled={!name} type="submit" value="Create" />
          </div>
          <a href="#" onClick={()=> Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default Add;