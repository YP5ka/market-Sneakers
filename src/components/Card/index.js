import styles from './Card.module.scss'
import React from 'react';
import ContentLoader from "react-content-loader"
import { AppContext } from '../../App'


function Card({id, name, imageUrl, price,  onClickPlus, onFavorite, favorited = false, loading = false}) {
   
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const {isItemAdded} = React.useContext(AppContext)
    
    const onPlus = () => {
        onClickPlus({id, name, imageUrl, price});
    }

    const onClickFavorite =() => {
        onFavorite({id, name, imageUrl, price});
        setIsFavorite(!isFavorite);
    };

    return(
                 <div className={styles.card}>
                    {
                        (loading ? <ContentLoader 
                            speed={2}
                            width={150}
                            height={190}
                            viewBox="0 0 150 190"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                        <rect x="5" y="75" rx="0" ry="0" width="17" height="1" /> 
                        <rect x="0" y="100" rx="5" ry="5" width="150" height="15" /> 
                        <rect x="0" y="125" rx="5" ry="5" width="100" height="15" /> 
                        <rect x="0" y="165" rx="5" ry="5" width="80" height="25" /> 
                        <rect x="117" y="160" rx="10" ry="10" width="32" height="32" />
                      </ContentLoader> : (<>
                            {onFavorite && <div className={styles.favorite} onClick = {onClickFavorite}>
                                <img src = {isFavorite ? "/img/heart-on.svg" : "/img/heart-off.svg"} alt ="heart-off"/>
                            </div>}    
                                <img width = '100%' height={130} src={imageUrl} alt="sneakers"/>
                            <h5>{name}</h5>
                            <div className="d-flex justify-between align-center">
                                <div className="d-flex flex-column">
                                    <span>Цена: </span>
                                    <b>{price}руб. </b>
                                </div>
                                    {onClickPlus && (<img className={styles.plus} 
                                    onClick = {onPlus}  
                                    src = {isItemAdded(id) ? "/img/button-on.svg" : "/img/button-plus.svg" } alt="plus"/>)}
                            </div>
                      </>))
                    }         
                </div>
    )
}

export default Card;