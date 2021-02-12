import React  from 'react';
import './style.css';
import { PieChart } from 'react-minimal-pie-chart';
import 'antd/dist/antd.css';
import { useAppContext } from '../../store';
import { useLoginCheck } from '../../utils/setAuthToken';

function DashboardNewsCard(props) {
    const [state, appDispatch] = useAppContext();
    useLoginCheck(appDispatch);

    console.log(state.user)
    return (
        <div height="400px"className="mx-auto col-sm-8 cardBackground">
            <div className="card-body">

            <div className="mx-left col-sm-4">
            
                <PieChart 
                    data={[
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                    />;
             
            </div>
           
            </div>  
        </div>
    );
}

export default DashboardNewsCard;
