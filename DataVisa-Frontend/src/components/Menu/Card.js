import React from 'react'
import { Panel } from 'primereact/panel'
import Barras from '../Templates/Barras'

const Card = ({img, gerar}) => {
  return (
    <div className="col-3 grid m-2" id='card' onClick={gerar}>
        <img src={img} alt="" style={{height:"200px", width:"250px"}}/>
    </div>
  )
}

export default Card