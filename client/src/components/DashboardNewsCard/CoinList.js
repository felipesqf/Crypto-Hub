import React, { useState } from "react";
import "./style.css";
import { Table, Button, Modal, Input } from 'antd';
import { addFav, addPort } from '../../utils/userFunctions';
import { useAppContext } from '../../store';
import { useLoginCheck } from '../../utils/setAuthToken';
import DashboardNewsCard from './DashboardNewsCard'

function CoinList(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [coin, setCoin] = useState();
  const [state, appDispatch] = useAppContext();
  
  useLoginCheck(appDispatch);

  // let newUser = state.user
  // setUser(newUser)

  const showModal = (e) => {
    setCoin(e)
    setIsModalVisible(true);
  };
  // console.log(state.user.total)
  // console.log(coin.current_price)
  const handleOk = async() => {
    let coinAmount = document.getElementById("amount").value;
    let userData = {
      email: state.user.email,
      coin: coin.name,
      total: (state.user.total + (coinAmount * coin.current_price)),
      currentPrice: coin.current_price,
      amount: coinAmount,
    }
    let total = state.user.total + (coinAmount * coin.current_price)
    state.user.total = total
    await props.handleChange(state.user)
    addPort(userData)
    setIsModalVisible(false);
    console.log(state.user)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });  

  const setFav = async (e) =>{
    // console.log(state.user)
    let coins = props.results
    let newFav  = coins.filter(item => e === item.name)
    let userData = {
      email: state.user.email,
      coin: newFav
    }
      await state.user.favorite.push(e)
      addFav(userData);
      console.log(state.user)
      // getUser(state.user.email)
  }
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
      title: 'Portfolio',
      dataIndex: 'portfolio',
      key: 'portfolio',
      render: portfolio => <Button type="primary" onClick={()=> showModal(portfolio)}>Add to my portfolio</Button>
    },
    {
      title: 'Favorites',
      dataIndex: 'favorites',
      key: 'favorites',
      render: favorites => <Button onClick={()=> setFav(favorites)} type="primary">Add to my favorites</Button>
    },
  ];
  const data = props.results.map(result => ({
        no : result.market_cap_rank,
        image :result.image,
        symbol : result.symbol.toUpperCase(),
        coin :result.name,
        price : formatter.format(result.current_price),
        portfolio : result,
        favorites : result.name,
        }));
  return (

    <div className="mx-auto col-sm-8">     
  
    <Modal title="Add Coin" visible={isModalVisible} onOk={coin => handleOk(coin)} onCancel={handleCancel}>
        <Input id="amount" placeholder="Amount" />
    </Modal>

    <table>
        <Table rowKey="coin" dataSource={data} columns={columns}/>
    </table>
    </div>
  );
  };

export default CoinList;


