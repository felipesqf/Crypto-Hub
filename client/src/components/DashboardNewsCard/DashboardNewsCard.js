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
    // let newUser = state.user
    // setUser(newUser)
   
    // let amountUSD
    console.log(state.user)
    // let calculatePort = portfolio.foreach(res =>( res.name === storedCoins.current_price
    // ))

    const percentage = state.user.portfolio.map(item => ({
            title: item.coin,
            value: (((item.currentPrice * item.amount) /state.user.total) * 100 ).toFixed(2),
            color: getRandomColor(),
        }
        ));

        console.log(percentage)
    return (
        <div height="400px"className="mx-auto col-sm-8 cardBackground">
            <div className="card-body">
            <div className="mx-left col-sm-4">
                    <PieChart  
                    data={percentage}
                    />
                    <div>
                        <h1> Total: {formatter.format(state.user.total)}</h1>
                    </div>
            </div>
            <div className="mx-left col-sm-4">
            <h2>Coins</h2>
                {percentage.map(item => 
                <div>
                    <Badge color={item.color}/>
                    <p>{ item.title }:%{ item.value }~</p>
                </div>
                )}
            </div>   
            <div className="mx-left col-sm-4">
            <h2>Favorites</h2>
                {state.user.favorite.map(item => 
                <div>
                    <StarFilled /><p>{item.coin}</p>
                </div>
                )}
            </div>   
            </div>  
        </div>
    );
}

export default DashboardNewsCard;
