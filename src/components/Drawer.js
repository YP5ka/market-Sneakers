import Info from "./Card/info";
import React from "react";
import { useCart } from "../hooks/useCart";
import axios from "axios";

function Drawer({onClose, items = [], onRemove}) {
    const {cartItems, setCartItemss, totalPrice} = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
   
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false)
   
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const onClickOrder = async () => {
        
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://651b00a0340309952f0e2551.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id)
            setIsOrderComplete(true);
            setCartItemss([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://65142c478e505cebc2eadec6.mockapi.io/cart/${item.id}`)
                await delay(1000);
            }
        } catch (error) {
            alert('Не удалось создать заказ')
        }
        setIsLoading(false)
    }

    return(
        <div className="overlay"> 
            <div  className="drawer ">
                    <h2 className="mb-30 d-flex  justify-between ">
                        Корзина <img onClick={onClose} className =" cu-p removeBtn" src = "/img/btn-remove.svg"alt="btn-remove"/>
                    </h2> 

                    {items.length > 0 ?(
                        <>
                        <div className="items">
                        {
                            items.map((obj) =>
                            <div key={obj.id}  className="cartItem d-flex align-center mb-20">
                            <div style ={{backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                            <div className="mr-20">
                                <p className="mb-5">{obj.name}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img onClick = {() => onRemove(obj.id)} className ="removeBtn" src = "/img/btn-remove.svg"alt="btn-remove"/>
                        </div>
                        )}
                    </div>

                    <div className="cartTotalBlock">
                        <ul>
                            <li className="d-flex">
                                <span>Итого:</span>
                                <div></div>
                                <b>{totalPrice} руб.</b>
                                
                            </li>
                            <li className="d-flex">
                                <span>Налог 5%:</span>
                                <div></div>
                                <b>{totalPrice / 100 * 5} руб.</b>
                            </li>
                        </ul>
                            <button disabled = {isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow"/></button>
                    </div></>) : <Info 
                    title ={isOrderComplete ? "Заказ выполнен!" : "Корзина пустая"}
                    description ={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок" } 
                    image = {isOrderComplete ? "/img/complete-order.png" : "/img/emptyBox.jpg"   } 
                    />
                   
                    }
                </div>
            </div>    
    )
}

export default Drawer;