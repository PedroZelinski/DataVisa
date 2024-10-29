import React from 'react'
import Card from '../../components/Menu/Card'
import plus from '../../assets/plus.png'
import barrasDefault from '../../assets/barrasDefault.png'
import pizzaDefault from '../../assets/pizzaDefault.png'
import linhaDefault from '../../assets/linhaDefault.png'
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import { useNavigate } from 'react-router-dom'

const Recentes = () => {
  const navigate = useNavigate();
  const gerar = () => navigate("/menu/gerar")

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="col-12">Recentes</div>

        <div className="scroll-white grid col-12" style={{height: 'calc(100vh - 170px)'}}>

          <div className="col-3 grid m-2 ml-4" id='create-btn' onClick={() => navigate("/menu/criar")}>
            <div className="col-12 mt-3 text-center">
              <img src={plus} alt="" style={{ height: "80px" }} />
            </div>
            <div className="col-12 p-0 text-center" id='text-color'
              style={{ fontSize: "15px" }}>
              Crie seu grafico ou tabela
            </div>
          </div>

          {/* <div className="card-area col-3 grid m-2">
            <div className="col-10 font-bold">Primary Text</div>
            <div className="col-2"><i className='fi fi-rr-info' /></div>

            <div className="col-12" style={{ fontSize: '12px' }}>
              Secondary Text <hr />
            </div>

            <div className="col-12 text-center">
              <i className='fi fi-tr-chart-pie' style={{ fontSize: "90px" }} />
              <i className='fi fi-rr-list ml-1' style={{ fontSize: "30px" }} />
            </div>
          </div> */}

          <Card img={pieChart} gerar={gerar}></Card>
          <Card img={barChart} gerar={gerar}></Card>
          <Card img={lineChart} gerar={gerar}></Card>
          <Card img={spreadsheet} gerar={gerar}></Card>
          <Card img={pieChart} gerar={gerar}></Card>
          <Card img={barChart} gerar={gerar}></Card>
          <Card img={lineChart} gerar={gerar}></Card>
          <Card img={spreadsheet} gerar={gerar}></Card>
          
        </div>

      </div>
    </div>
  )
}

export default Recentes