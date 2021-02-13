import React, { useState } from 'react';
import './style.css';
import Candle from '@ant-design/charts';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


function LandingJumbo(props) {

let storedDataChart = JSON.parse(localStorage.getItem("chartData"));


let dateObj = new Date(storedDataChart.data.prices[0][0] * 1000);
console.log(dateObj)
console.log(storedDataChart.data.prices.length)
// console.log(dayOne)
for (let i=0; i< storedDataChart.data.prices.length; i++){
  let date = new Date(storedDataChart.data.prices[i][0])
  let day = date.getDate()
  let month = date.getMonth()
  storedDataChart.data.prices[i][0] = day+"/"+month
  console.log(storedDataChart.data.prices[i][0])
}

//data for the chart
      const data = [
        { date: storedDataChart.data.prices[0][0], value: storedDataChart.data.prices[0][1] },
        { date: storedDataChart.data.prices[1][0], value: storedDataChart.data.prices[1][1] },
        { date: storedDataChart.data.prices[2][0], value: storedDataChart.data.prices[2][1] },
        { date: storedDataChart.data.prices[3][0], value: storedDataChart.data.prices[3][1] },
        { date: storedDataChart.data.prices[4][0], value: storedDataChart.data.prices[4][1] },
        { date: storedDataChart.data.prices[5][0], value: storedDataChart.data.prices[5][1] },
        { date: storedDataChart.data.prices[6][0], value: storedDataChart.data.prices[6][1] },
        { date: storedDataChart.data.prices[7][0], value: storedDataChart.data.prices[7][1] },
        {color:'black'}
      ]
      const config = {
        data,
        color:'black',
        // height: 100,
        xField: 'date',
        yField: 'value',
        point: {
          // size: 5,
          shape: 'diamond',
          color:'black',
          style: {
            fill: '#fff',
            
          },
        },
        label: {
          color:'black',
          style: {
            fill: '#fff',
            
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
