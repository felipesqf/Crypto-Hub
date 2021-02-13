import React from "react";
import "./style.css";
import { Table, Button } from 'antd';


function SearchResults(props) {

  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });


  function handleClick(e){
    let newArray = props.results
    let newDataCard  = newArray.filter(item => e === item.name)
    // props.dataCard = newDataCard[0];
      props.handleChange(newDataCard[0])   //make sure to pass the value in the
  }
  
  // alert(this.getAttribute("data-row-key"))
  const columns = [
    {
      
      title: 'Rank',
      dataIndex: 'no',
      key: 'no',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.no - b.no,
      // render: text => <a onClick={console.log(document.querySelector("data-row-key"))}>{text}</a>,
      // onClick: handleClick
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
      // render: text => <a onClick={handleClick}>{text}</a>,
    },
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
      data: 'coin',
      // render: text => <a onClick={handleClick}>{text}</a>,
    },
    {
      title: 'Current Price',
      dataIndex: 'price',
      key: 'price',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.price - b.price,
      // render: text => <a onClick={handleClick}>{text}</a>,
    },
    {
      title: 'Mk Cap',
      dataIndex: 'mktcap',
      key: 'mktcap',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.mktcap - b.mktcap,
      // render: text => <a onClick={handleClick}>{text}</a>,
    },
    {
      title: 'Supply',
      dataIndex: 'supply',
      key: 'supply',
      // render: text => <a onClick={handleClick}>{text}</a>,
    }
    ,
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: detail => <Button onClick={() => handleClick(detail)} type="button">View Details</Button>,
    },
  ];
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

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


