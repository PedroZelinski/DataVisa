import React from 'react'
import Card from '../../components/Menu/Card'
import plus from '../../assets/plus.png'
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import { useNavigate } from 'react-router-dom'


const Recentes = () => {
  const navigate = useNavigate();


  return (
    <div className='col-12'>


      <div className="grid nested-grid">

        <div className="col-12 font-bold">Recentes</div>

        <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 170px)' }}>

          <div className="col-3 grid m-2 ml-4" id='create-btn' onClick={() => navigate("/menu/criar")}>
            <div className="col-12 mt-5 text-center">
              <div>
                <i className='fi fi-rr-plus' style={{fontSize:"70px"}}/>
              </div>
              <div className='mt-3'>Crie seu gráfico ou tabela</div>
            </div>
          </div>

          <Card img={pieChart} navigate={navigate} ></Card>
          <Card img={barChart} navigate={navigate} ></Card>
          <Card img={lineChart} navigate={navigate} ></Card>
          <Card img={spreadsheet} navigate={navigate} ></Card>
          <Card img={pieChart} navigate={navigate} ></Card>
          <Card img={barChart} navigate={navigate} ></Card>
          <Card img={lineChart} navigate={navigate} ></Card>
          <Card img={spreadsheet} navigate={navigate} ></Card>

        </div>

      </div>
    </div>
  )
}

export default Recentes