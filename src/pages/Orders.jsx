import React from 'react';
import Card from '../components/Card'
import {AppContext} from '../App'
import axios from 'axios';

export function Orders() {
    const [orders, setOrders] = React.useState([]);
    const {onAddToFavorite} = React.useContext(AppContext)
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
        (async() => {
            try {
                const {data} =  await axios.get('https://651b00a0340309952f0e2551.mockapi.io/orders')
                    setOrders(data.map((obj) => obj.items).flat())
                    setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказов')
            }
            
        })();
    }, [])
    
    
    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40 "> 
                <h1>Мои заказы</h1>
            </div>
            
                <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => 
                            (<Card
                                key={index}
                                loading = {isLoading}
                                {...item}
                            />)
                    )}
                </div>
            </div>
        
    );
}

