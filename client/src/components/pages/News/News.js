import React, { Component } from 'react';

import 'antd/dist/antd.css';
import "./style.css";
import API from "../../../utils/API";
import { Layout } from 'antd';
import { Card, Col, Row } from 'antd';
const { Footer } = Layout;


class News extends Component {
    state = {
        news:[],
        docs:[]
    };
    
    componentWillMount() {
        API.getNews()
        .then(res => {
            this.setState({ news: res.data })
            this.setState({ docs: this.state.news.response.docs })
            
        }
        )
      }
      
render(){
  localStorage.setItem("News", JSON.stringify(this.state.docs))
 let storedNews = JSON.parse(localStorage.getItem("News"));
    return(
      
    <Layout className="layout">
    <div className="d-flex justify-content-center backgroundImg">
        {/* <LandingJumbo/> */}
    </div>
            <div className="site-card-wrapper">
            {storedNews.map(result => (
            <Row id="row" gutter={16}>
            <Col span={24}>
                <Card bordered={false}>
                <h2>{result.abstract}</h2><br/>
                <p>{result.lead_paragraph}</p>
                <a target="_blank" href={result.web_url}>See the article here</a><br/>
                <span>By: {result.source}</span>
                </Card>
            </Col>
            </Row>)
            )}
        </div>
        <Footer style={{ textAlign: 'center' }}>Felipe Ferreira Web Development Services</Footer>
  </Layout>
    )
    }
//   }
}
export default News;