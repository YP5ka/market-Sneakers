import { AppContext } from "../App";
import React from "react";

export const useCart = () => {

    const {cartItems, setCartItemss} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return{cartItems, setCartItemss, totalPrice}
}