import React, { Component } from "react";
import SearchResults from '../../SearchResults/index';
import API from "../../../utils/API";
import LandingJumbo from '../../LandingJumbo/LandingJumbo';
import SearchInput from '../../SearchInput/index';
// import 'antd/dist/antd.css';
import "./main.css";
import { Layout } from 'antd';
const { Content, Footer } = Layout;
//1. Import coingecko-api
const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

class Main extends Component {
    state = {
      search: "",
      coin: [],
      results: [],
      dataCard: [],
      chart: [],
      loading: false
    };


  handleChange(value){
      //handeling the data to show in the card
      this.setState({ dataCard: value });
      localStorage.setItem("cardData", JSON.stringify(value))

      let storedCard = JSON.parse(localStorage.getItem("cardData"));  
      CoinGeckoClient.coins.fetchMarketChart(storedCard.id, {
        days: 7,
        interval: "daily"
      }).then(res => {
        localStorage.setItem("chartData", JSON.stringify(res))
        let { data } = res.data
        this.setState({ chart: data, loading: false })})
  }

  handleInputChange = event => {
    const value = event.target.value;
    let storedCoins = JSON.parse(localStorage.getItem("coinList"));
    let filteredCoin = storedCoins.filter(letter => letter.id.includes(value))
    this.setState({ results: filteredCoin });
    
  };
    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };
    //getting the list of coins from coingecko api
    componentDidMount() {
      this.setState({
        loading: true
      });

       //get the card data stored
        // let storedCard = JSON.parse(localStorage.getItem("cardData"));     
        //get list of coins
        API.getCoins()
        .then(res => {
        localStorage.setItem("coinList", JSON.stringify(res.data))
        this.setState({ results: res.data })
        this.setState({ dataCard: res.data[0]  })
        })
        .catch(err => console.log(err));
        
        // get the chart data
        CoinGeckoClient.coins.fetchMarketChart('bitcoin', {
          days: 7,
          interval: "daily"
        }).then(res => {
          localStorage.setItem("chartData", JSON.stringify(res))
          let { data } = res.data
          this.setState({ chart: data, loading: false })})
    }
  
    render() {
      return(
        //rendering
            <Layout className="layout">
                <div className="d-flex justify-content-center backgroundImg">
                  <LandingJumbo results={this.state.dataCard} chart={this.state.chart}/>
                </div>
                <Content style={{ padding: '0 50px' }}>
                  <div className="justify-content-center">
                  <SearchInput coin={this.state.coin} handleInputChange={this.handleInputChange}/>
                  <table className="justify-content-center">
                    <SearchResults handleChange={this.handleChange.bind(this)} dataCard={this.state.dataCard} results={this.state.results} />
                  </table>
                  </div>
                </Content>
                <Footer className="footer" style={{ textAlign: 'center', backgroundColor: "#001f3f",color:"#fff" }}>Felipe Ferreira Web Development Services</Footer>
              </Layout>
      );
    }

  }
  export default Main;