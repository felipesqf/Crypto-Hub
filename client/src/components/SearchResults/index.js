import React from "react";
import "./style.css";
import { Table, Button } from 'antd';


function SearchResults(props) {
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  //handle search input
  function handleClick(e){
    let newArray = props.results
    let newDataCard  = newArray.filter(item => e === item.name)
      props.handleChange(newDataCard[0])   //make sure to pass the value in the
  }
  
  //building table
  const columns = [
    {
      
      title: 'Rank',
      dataIndex: 'no',
      key: 'no',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.no - b.no,
    },
    {
      title: 'Logo',
      dataIndex: 'image',
      key: 'image',
      render: image => <img id="imagetable"src={image} alt="coin" width="25px" height="25px"></img>
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      data: 'coin',
    },
    {
      title: 'Current Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Mk Cap',
      dataIndex: 'mktcap',
      key: 'mktcap',
      sorter: (a, b) => a.mktcap - b.mktcap,
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
    }
    ,
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: detail => <Button onClick={() => handleClick(detail)} type="button">View Details</Button>,
    },
  ];

  const data = props.results.map(result => ({
        no : result.market_cap_rank,
        image :result.image,
        symbol : result.symbol.toUpperCase(),
        coin :result.name,
        price : formatter.format(result.current_price),
        mktcap : formatter.format(result.market_cap),
        supply : result.total_supply,
        details : result.name,
        }));
  return (
    <table>
        <Table rowKey="coin" dataSource={data} columns={columns}/>
    </table>
  );
  };

export default SearchResults;


