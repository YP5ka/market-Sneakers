 
import Header from './components/Header'
import Drawer from './components/Drawer'
import React from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import { Orders } from './pages/Orders'




function App() {
const [items, setItems] = React.useState([]);
const [cartItems, setCartItemss] = React.useState([]);
const [searchValue, setSearchValue] = React.useState([]);
const [favorites, setFavorites] = React.useState([]);
const [cartOpened, setCartOpened] = React.useState(false);
const [isLoading, setIsLoading] = React.useState(true);

React.useEffect(() => {
   async function fetchData(){
    setIsLoading(true);

    const cartResponse = await axios.get('https://65142c478e505cebc2eadec6.mockapi.io/cart');
    const favoriteResponse = await axios.get('https://651b00a0340309952f0e2551.mockapi.io/favorites');
    const itemsResponse = await axios.get('https://65142c478e505cebc2eadec6.mockapi.io/items');

    setIsLoading(false);

    setCartItemss(cartResponse.data);
    setFavorites(favoriteResponse.data);
    setItems(itemsResponse.data);
   
   }

   fetchData();
}, []);



const onAddToCart = (obj) => {
    
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))){
        axios.delete(`https://65142c478e505cebc2eadec6.mockapi.io/cart/${obj.id}`)
        setCartItemss(prev => prev.filter(item => Number(item.id) !== Number(obj.id)) )
    }
    else{
            axios.post('https://65142c478e505cebc2eadec6.mockapi.io/cart', obj)
            setCartItemss ((prev) => [...prev, obj]);
    }
};

const onRemoveItem = (id) => {
     axios.delete(`https://65142c478e505cebc2eadec6.mockapi.io/cart/${id}`)
     setCartItemss((prev) => prev.filter(item => item.id !== id));
}

const onChangeSearchInput = (event) =>{
    setSearchValue(event.target.value)
}

const onAddToFavorite = async (obj) =>{
    try {
        if (favorites.find(favObj => favObj.id === obj.id)){
            axios.delete(`https://651b00a0340309952f0e2551.mockapi.io/favorites/${obj.id}`)
            setFavorites((prev) => prev.filter(item => item.id !== obj.id))
        }else{
            const {data} = await axios.post('https://651b00a0340309952f0e2551.mockapi.io/favorites', obj)
            setFavorites ((prev) => [...prev, data]);
        }
    } catch (error){
        alert('Не удалось добавить в избранное')
    }  
}

const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
}

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, setCartOpened, setCartItemss, onAddToCart, onAddToFavorite}}>
        <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems } onClose = {() => setCartOpened(false)} onRemove = {onRemoveItem}/>}
        <Header onClickCart = {() => setCartOpened(true)} />
        <Routes>
             <Route path='/' exact
                element = {
                <Home 
                items = {items} 
                cartItems = {cartItems}
                searchValue = {searchValue} 
                etSearchValue = {setSearchValue} 
                onChangeSearchInput = {onChangeSearchInput}
                onAddToFavorite = {onAddToFavorite}
                onAddToCart = {onAddToCart} 
                isLoading = {isLoading}
                />}>
            </Route>
            <Route path="/favorites" exact element={<Favorites items = {favorites} onAddToFavorite = {onAddToFavorite} />}></Route>
            <Route path="/orders" exact element = {<Orders />}></Route>
        </Routes>
    </div>
    </AppContext.Provider>
  );
}
export const AppContext = React.createContext({});
export default App;
