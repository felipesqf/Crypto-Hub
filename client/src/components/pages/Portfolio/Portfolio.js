import React from 'react';
import CoinList from '../../DashboardNewsCard/CoinList';
import DashboardNewsCard from '../../DashboardNewsCard/DashboardNewsCard';
import { useAppContext } from '../../../store';
import { useLoginCheck } from '../../../utils/setAuthToken';
import { getUser } from '../../../utils/userFunctions';
// This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';
// let Web3 = require("web3");
// let url_infura = "https://mainnet.infura.io/v3/489fa9bf01b84e339374b0d440d0be6d";
// let web3 = new Web3(url_infura);
// let address= "0xa706a2f80fa316052539bc69bb6b61e4a22f04e8";

// const provider = detectEthereumProvider();
//     console.log(window.ethereum)
//     if (typeof window.ethereum !== 'undefined') {
//         console.log('MetaMask is installed!');
//       }


// function requestAccess(){
//   window.ethereum.request({ method: 'eth_requestAccounts' }).then(res => console.log(res))
//   web3.eth.getBalance(address, (error, balance) =>{
//     if(!error){
//         console.log(balance, 'ether')
//     }
//     else{
//         console.log(error)
//     }
// });
// };


function Portfolio() {
    let storedCoins = JSON.parse(localStorage.getItem("coinList"));
    const [state, appDispatch] = useAppContext();
    useLoginCheck(appDispatch);

    function handleChange(event) {
        console.log(state.user.email)
        getUser(state.user.email).then(res => {
            console.log(res)
            this.appDispatch({ state : res })
            
        })
      };

    return (
        <div className="pl-0 container-fluid">
            {/* <Sidebar /> */}
            {/* <button onClick={requestAccess} class="enableEthereumButton">Enable Ethereum</button> */}
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
