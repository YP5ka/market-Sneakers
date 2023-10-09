import React from 'react'
import { AppContext } from '../../App';

const Info = ({title, image, description}) => {

    const {setCartOpened} = React.useContext(AppContext)
  return (
    
    <div>
            
        <div className="buckEmpty d-flex justify-center flex-column align-center">
                        <img width = {250} height={250} src={image} alt="box" />
                        <h3>{title}</h3>
                        <p>{description}</p>
                        <button onClick ={() => setCartOpened(false)} className="greenButton">Вернуться назад <img src="/img/arrow.svg" alt="arrow"/></button>
                    </div>
    </div>
  )
}


export default Info;