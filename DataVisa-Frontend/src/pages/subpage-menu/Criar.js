import React from 'react'
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import CardModelo from '../../components/Menu/CardModelo.js'
import { useNavigate } from 'react-router-dom'

const Criar = () => {
  const navigate = useNavigate()
  const filtrar = () => navigate("/menu/filtrar")

  return (
    <div className='col-12'>
      <div className="grid nested-grid">
        <div className="col-12">Escolha o modelo</div>

        <div className='cadastro-area grid col-5 m-2'>
          <i className='fi fi-rr-search mr-2 pt-2' />
          <input type="text" placeholder="Pesquisar pelo nome"
            style={{ border: 'none', width: '92%' }} />
        </div>

        <div className="scroll-white grid col-12 mt-2" style={{height: 'calc(100vh - 240px)'}}>
          <CardModelo img={pieChart} filtrar={filtrar}/>
          <CardModelo img={barChart} filtrar={filtrar}/>
          <CardModelo img={lineChart} filtrar={filtrar}/>
          <CardModelo img={spreadsheet} filtrar={filtrar}/>
        </div>

      </div>
    </div>
  )
}

export default Criar