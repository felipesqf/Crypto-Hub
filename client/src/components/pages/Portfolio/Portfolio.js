import React from 'react';
import CoinList from '../../DashboardNewsCard/CoinList';
import DashboardNewsCard from '../../DashboardNewsCard/DashboardNewsCard';
import { useAppContext } from '../../../store';
import { useLoginCheck } from '../../../utils/setAuthToken';
import { getUser } from '../../../utils/userFunctions';

function Portfolio() {
    //get the list of coins on local storage
    let storedCoins = JSON.parse(localStorage.getItem("coinList"));
    const [state, appDispatch] = useAppContext();
    useLoginCheck(appDispatch);

    function handleChange(event) {
        console.log(state.user.email)

        // state.forceUpdate();
        // getUser(state.user.email).then(res => {
        //     console.log(res)
        //     this.state({ user : res })
        // })
      };

    return (
        <div className="pl-0 container-fluid">
            <div>
                <h1>
                    My Portfolio
                </h1>
                <div className="flex-row-reverse mr-5 d-flex">
                    <DashboardNewsCard state={state}/>
                </div>
                <CoinList  onChange={useLoginCheck(appDispatch)} handleChange={handleChange.bind(this)} results={storedCoins}/>
            </div>
        </div>
    );
}

export default Portfolio;
