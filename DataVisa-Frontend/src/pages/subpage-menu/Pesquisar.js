import React, { useState } from 'react'
import Card from '../../components/Menu/Card'
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'
import PesquisarFiltros from '../../components/Menu/PesquisarFiltros'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from "primereact/checkbox";


const Pesquisar = () => {
  const [checkedTodos, setCheckedTodos] = useState(true);
  const [checkedPizza, setCheckedPizza] = useState(true);
  const [checkedLinhas, setCheckedLinhas] = useState(true);
  const [checkedBarras, setCheckedBarras] = useState(true);
  const [checkedPlan, setCheckedPlan] = useState(true);
  const navigate = useNavigate();
  const gerar = () => navigate("/menu/gerar")

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className='cadastro-area grid col-4 m-2'>
          <i className='fi fi-rr-search mr-2 pt-2' />
          <input type="text" placeholder="Pesquisar pelo nome"
            style={{ border: 'none', width: '92%' }} />
        </div>

        <div className="col-12 font-bold">Resultados</div>
        <div className="grid nested-grid col-12">

          <div className="grid col-3 ml-1 mt-2"
            style={{ border: "solid 1px #366FE1", borderRadius: "5px", height: 'calc(100vh - 235px)' }}>
            <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 240px)', borderRadius: "5px" }}>

              <PesquisarFiltros
                checkedTodos={checkedTodos} setCheckedTodos={setCheckedTodos}
                checkedPizza={checkedPizza} setCheckedPizza={setCheckedPizza}
                checkedLinhas={checkedLinhas} setCheckedLinhas={setCheckedLinhas}
                checkedBarras={checkedBarras} setCheckedBarras={setCheckedBarras}
                checkedPlan={checkedPlan} setCheckedPlan={setCheckedPlan}
              />
              
            </div>
          </div>

          <div className="grid col-9 ml-2">
            <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 220px)' }}>

              {checkedPizza == true ? <Card img={pieChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedBarras == true ? <Card img={barChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedLinhas == true ? <Card img={lineChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedPlan == true ? <Card img={spreadsheet} gerar={gerar} col="col-4"></Card> : ""}
              {checkedPizza == true ? <Card img={pieChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedBarras == true ? <Card img={barChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedLinhas == true ? <Card img={lineChart} gerar={gerar} col="col-4"></Card> : ""}
              {checkedPlan == true ? <Card img={spreadsheet} gerar={gerar} col="col-4"></Card> : ""}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Pesquisar