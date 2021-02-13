import React, {useState}  from 'react';
import './style.css';
import { PieChart } from 'react-minimal-pie-chart';
import 'antd/dist/antd.css';
import { useAppContext } from '../../store';
import { useLoginCheck } from '../../utils/setAuthToken';
import { Badge } from 'antd';
import StarFilled from '@ant-design/icons';

function DashboardNewsCard(props) {
    // let storedCoins = JSON.parse(localStorage.getItem("coinList"));
    // const [user, setUser] = useState();
    const [state, appDispatch] = useAppContext();
    useLoginCheck(appDispatch);

    console.log(props.state.user)
    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });  
    // console.log(state.user.portfolio)
    let getRandomColor = () =>{
         let randomColor = Math.floor(Math.random()*16777215).toString(16)
         randomColor = '#'+randomColor
         console.log(randomColor)
         return randomColor
    }
    function handleChange(event) {
        this.setState({ results: event });
      };

      
    // let amountUSD
    console.log(props.state.user)
    // let calculatePort = portfolio.foreach(res =>( res.name === storedCoins.current_price
    // ))

    const percentage = props.state.user.portfolio.map(item => ({
            title: item.coin,
            value: (((item.currentPrice * item.amount) /props.state.user.total) * 100 ).toFixed(2),
            color: getRandomColor().toUpperCase(),
        }
        ));
        percentage.forEach(element => { 
            element.value = parseFloat(element.value)
            
        });
        console.log(percentage)
    return (
        <div height="400px"className="mx-auto col-sm-8 cardBackground">
            <div className="card-body">
            <div className="mx-left col-sm-4">
            <PieChart
                    data={percentage}
                    />;
                    <div>
                        <h1> Total: {formatter.format(state.user.total)}</h1>
                    </div>
            </div>
            <div className="mx-left col-sm-4">
            <h2>Coins</h2>
            <ul>
                {percentage.map(item => 
                <li>
                    <p><Badge color={item.color}/> { item.title }: % { item.value }~</p>
                </li>
                )}
                </ul>
            </div>   
            <div className="mx-left col-sm-4">
            <h2>Favorites</h2>
            <ul>
                {props.state.user.favorite.map(item => 
                <li>
                    <p><StarFilled />{item.coin}</p>
                </li>
                )}
            </ul>
            </div>   
            </div>  
        </div>
    );
}

export default DashboardNewsCard;
