import React from 'react'

const CardModelo = ({ img, filtrar }) => {
  return (
    <div className="card-area col-3 grid m-2 ml-4">

      <div className="col-10 font-bold">Tipo de Gráfico</div>

      <div className="col-12 text-center" style={{ cursor: 'pointer' }}
        onClick={() => filtrar()}>
        <img src={img} alt="" style={{ height: '100px' }}/>
      </div>
    </div>
  )
}

export default CardModelo