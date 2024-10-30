import React from 'react'
import logo from '../../assets/logoOriginal.png'
import Pizza from '../../components/Templates/Pizza.js'
import { useNavigate } from 'react-router-dom'

const Gerar = () => {
  const navigate = useNavigate()

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="col-12 grid">
          <div className="col-11 font-bold" style={{fontSize: '25px'}}>
            Resultado
          </div>
          <div className="col-1">
            <button className='cadastro-btn-blue' onClick={() => navigate("/menu/recentes")}>
              Menu</button>
          </div>
        </div>

        <div className="card-area grid ml-3 mb-3 mr-3 w-full">
          <div className="col-2 mt-4 text-right">
            <img src={logo} alt="" style={{ height: "90px" }} />
          </div>

          <div className="col-7">
            <Pizza
              valores={["25", "30", "67", "6"]}
              labels={["Text 1", "Text 2", "Text 3", "Text 4"]}
              nome={"Grafico de Teste"}
            />
          </div>

          <div className="col-3 text-center">
            <div className="col-12">
              <button className='gerar-btn'>
                Visualizar <i className='fi-rr-eye ml-1'/>
              </button>
            </div>
            <div className="col-12">
              <button className='gerar-btn'>
                Baixar <i className='fi-rr-download ml-1' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gerar