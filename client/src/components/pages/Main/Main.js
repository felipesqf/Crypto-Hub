import React, { Component } from "react";
import SearchResults from '../../SearchResults/index';
import API from "../../../utils/API";
import LandingJumbo from '../../LandingJumbo/LandingJumbo';
import 'antd/dist/antd.css';
import "./main.css";
import { Layout } from 'antd';
const { Content, Footer } = Layout;

class Search extends Component {
    state = {
      search: "",
      coin: [],
      results: [],
      dataCard: [],
      cart: [],
    };
 

  handleChange(value){
      this.setState({ dataCard: value });
  }

    handleSizeChange = (e) => {
      this.setState({ size: e.target.value });
    };
    //getting the list of coins from coingecko api
    componentDidMount() {
        // this.getCoins();
        API.getCoins()
        .then(res => {
        this.setState({ results: res.data })
        this.setState({ dataCard: res.data[0] })
        //get coin sevendaychart
            API.getSevenDayChart(res.data[0].id)
            .then(chart => {
              this.setState({ chart: chart })
            })
        // console.log(this.state.results)
        })
        .catch(err => console.log(err));
    }
  
   //https://medium.com/the-capital/crypto-trading-strategies-you-need-to-know-for-2020-11914e7b3815
  //Render on the screen

    render() {
      
      return(

            <Layout className="layout">

                <div className="d-flex justify-content-center backgroundImg">
                  <LandingJumbo results={this.state.dataCard} chart={this.state.chart}/>
                </div>
           
                <Content style={{ padding: '0 50px' }}>
                  <div className="justify-content-center">
                  <table className="justify-content-center">
                    <SearchResults handleChange={this.handleChange.bind(this)} dataCard={this.state.dataCard} results={this.state.results} />
                  </table>
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Felipe Ferreira Web Development Services</Footer>
              </Layout>
      );
    }

  }
  export default Search;