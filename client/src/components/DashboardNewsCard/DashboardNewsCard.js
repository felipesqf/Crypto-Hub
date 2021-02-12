import React  from 'react';
import './style.css';
import { FullOption, PieChart } from 'react-minimal-pie-chart';
import 'antd/dist/antd.css';
import { useAppContext } from '../../store';
import { useLoginCheck } from '../../utils/setAuthToken';

function DashboardNewsCard(props) {
    let storedCoins = JSON.parse(localStorage.getItem("coinList"));
    const [state, appDispatch] = useAppContext();
    useLoginCheck(appDispatch);

    console.log(state.user.portfolio)
    let getRandomColor = () =>{
         let randomColor = Math.floor(Math.random()*16777215).toString(16)
         randomColor = '#'+randomColor
         console.log(randomColor)
         return randomColor
    }    
    
    let portfolio = state.user.portfolio

    for (let i = 0; i < portfolio.length; i++){
        if( portfolio[i].coin === storedCoins[0].name){
            portfolio.amountUSD = portfolio.amount * storedCoins.current_price
        }
    }
    


    // let amountUSD
    console.log(portfolio)
    // let calculatePort = portfolio.foreach(res =>( res.name === storedCoins.current_price
    // ))
    //     console.log(data)
    return (
        <div height="400px"className="mx-auto col-sm-8 cardBackground">
            <div className="card-body">
            <div className="mx-left col-sm-4">
                {/* <PieChart 
                    data={[
                        { title: "one", value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                    /> */}
                    <PieChart  
                    data={[
                        { title: "one", value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                    />
            </div>
           
            </div>  
        </div>
    );
}

export default DashboardNewsCard;
