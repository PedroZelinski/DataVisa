import React from 'react'
import logo from '../../assets/logoOriginal.png'
//import Barras from '../Templates/Barras'

const Gerar = () => {
  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="col-12 grid">
          <div className="col-10">
            Resultado
          </div>
          <div className="col-2">
            Menu
          </div>
        </div>

        <div className="cadastro-area col-12 grid">
          <div className="col-2" id='border'>
            <img src={logo} alt="" style={{height: "100px"}}/>
          </div>
          <div className="col-7" id='border'>

          </div>
          <div className="col-3" id='border'>Botões</div>
        </div>
      </div>
    </div>
  )
}

export default Gerar