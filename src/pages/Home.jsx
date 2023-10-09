
import { AppContext } from '../App';
import Card from '../components/Card'
import React from 'react'




function Home({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, cartItems, isLoading}) {
    const {isItemAdded} = React.useContext(AppContext)
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toString().toLowerCase()));
        return (isLoading ? [...Array(12)] : filteredItems).map((item, index) => 
                    (<Card
                    key={index}
                    onFavorite = {(obj) => onAddToFavorite(obj)}
                    onClickPlus = {(obj) => onAddToCart(obj)}
                    added = {isItemAdded(item && item.id)}
                    loading = {isLoading}
                    {...item}
                    />)
            )
        }
    return(
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40 "> 
                <h1>{searchValue ? `Поиску по запросу: ${searchValue}`: "Все кроссовки"}</h1>
                <div className=" search-block d-flex">
                    <img src = "/img/search.svg" alt = "search"/>
                    {searchValue &&  
                    <img onClick = {() => setSearchValue('')} 
                        className ="clear cu-p removeBtn" src = "/img/btn-remove.svg" alt="clear"
                     />}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex">
                <div className="d-flex flex-wrap">
                    {renderItems()}
                </div>
            </div>
        </div>
    );
}

export default Home;