'use strict';
// var request = require('request');
import { useState, useEffect } from 'react';

const url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=" + process.env.CHART_API_KEY!;

export const StockData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
  console.log(data);
  // const dataArray = Object.entries(data);

  // const IBMData = async (url: URL) => {
  //   try {
  //     const data = await fetch(url, {
  //       method: 'GET',
  //       headers: {'Content-Type': 'application/json'},
  //     });
  //     console.log("IBM data: ", data);
  //     return data;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <h1>{JSON.stringify(data)}</h1>
    {/* <h1>{JSON.stringify(data["Meta Data"]["1. Information"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["2. Symbol"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["3. Last Refreshed"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["4. Interval"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["5. Output Size"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["6. Time Zone"])}</h1>
    <h1>{JSON.stringify(data["Time Series (5min)"]["2023-03-09 18:35:00"]["1. open"])}</h1>
    <h1>{JSON.stringify(data["Time Series (5min)"]["2023-03-09 18:35:00"]["2. high"])}</h1>
    <h1>{JSON.stringify(data["Time Series (5min)"]["2023-03-09 18:35:00"]["3. low"])}</h1>
    <h1>{JSON.stringify(data["Time Series (5min)"]["2023-03-09 18:35:00"]["4. close"])}</h1>
    <h1>{JSON.stringify(data["Time Series (5min)"]["2023-03-09 18:35:00"]["5. volume"])}</h1> */}
    {/* <h1>{JSON.stringify(data["Meta Data"]["5. Output Size"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["5. Output Size"])}</h1>
    <h1>{JSON.stringify(data["Meta Data"]["5. Output Size"])}</h1> */}

    

    </div>
  )
};

export default StockData;