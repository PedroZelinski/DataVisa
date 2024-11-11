import React from 'react'

const Card = ({ img, gerar }) => {
  return (
    <div className="card-area col-3 grid m-2 ml-4">

      <div className="col-10 font-bold">Nome do Modelo</div>

      <div className="col-2 font-bold" style={{ fontSize: '20px' }}>
        <i className='fi fi-rr-info' style={{ cursor: 'pointer' }}
          onClick={() => alert("info")} />
      </div>

      <div className="col-12" style={{ fontSize: '12px' }}>
        Criado em: --/--/----
        <hr />
      </div>


      <div className="col-12 text-center" style={{ cursor: 'pointer' }}
        onClick={() => gerar()}>
        <img src={img} alt="" style={{ height: '100px' }}/>
      </div>
    </div>
  )
}

export default Card