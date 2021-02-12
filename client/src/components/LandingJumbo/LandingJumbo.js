import React, { useState } from 'react';
import './style.css';
import Candle from '@ant-design/charts';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

function LandingJumbo(props) {

  console.log(props.chart)
//   let dataChart = CoinGeckoClient.coins.fetchMarketChart('bitcoin', {
//       days: 7,
//       interval: "daily"
//     }) 
//  console.log(dataChart)
      const data = [
        { date: '1991', value: 1 },
        { date: '1992', value: 1 },
        { date: '1993', value: 1 },
        { date: '1994', value: 1 },
        { date: '1995', value: 1 },
        { date: '1996', value: 1 },
        { date: '1997', value: 1 },
        { date: '1998', value: 1 },
        {color:'black'}
      ]
      const config = {
        data,
        color:'black',
        height: 400,
        xField: 'date',
        yField: 'value',
        point: {
          size: 5,
          shape: 'diamond',
          color:'black',
        },
        label: {
          color:'black',
          style: {
            fill: '#aaa',
            
          },
        },
      };
    return (
        <div className="mt-5 jumbotron landingJumbo">
            <div  className="mx-left col-sm-4 jumboText">
            <div id="coinData">
                <h1  className="d-flex justify-content-left coin">
                    <div>
                    <h1>{props.results.name}</h1>
                    <img id="coinjumbo" src={props.results.image} alt="coin" width="200px" height="200px" margin="0px"></img>
                    </div>
                </h1>
                    <span>Current Price: {formatter.format(props.results.current_price)}</span><br/>
                    <span>24h High: {formatter.format(props.results.high_24h)}</span><br/>
                    <span>24h Low: {formatter.format(props.results.low_24h)}</span><br/>
                    <span>Price change % 24h: {formatter.format(props.results.price_change_percentage_24h)}</span><br/>
                    <span>Total Volume: {formatter.format(props.results.total_volume)}</span><br/>
                </div>
                
            </div>

                <div id="chart" className="mx-auto col-sm-8 jumboText">
                            <Candle.Line id="chart" {...config} />
                            <h1>7 Days Chart</h1>
                </div>
               
        </div>
    );
}

export default LandingJumbo;
