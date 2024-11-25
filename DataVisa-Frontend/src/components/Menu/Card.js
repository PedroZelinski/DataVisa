import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';
import pieChart from '../../assets/pie-chart.png'
import lineChart from '../../assets/line-chart.png'
import barChart from '../../assets/bar-chart.png'
import spreadsheet from '../../assets/spreadsheet.png'

const Card = ({ tipo, navigate, nome, data }) => {
  const [info, setInfo] = useState(false)
  const img = tipo == "Pizza" ? pieChart
    : tipo == "Barras" ? barChart 
    : tipo == "Linhas" ? lineChart : spreadsheet
  const footer = (
    <div className='relative mt-5'>

      <div className="text-left absolute bottom-0">

        <Button label="Remover" icon="fi fi-rr-cross" severity="danger"
          onClick={() => alert("todo")}/>
      </div>

      <div className='text-right absolute bottom-0 right-0'>

        <Button label="Editar" icon="fi fi-rr-pencil"
          onClick={() => navigate("/menu/filtrar")} />

        <Button label="Gerar" icon="fi fi-rr-check"
          onClick={() => navigate("/menu/gerar")} />
      </div>
    </div>
  )

  return (
    <div className="card-area col-3 grid m-2 ml-4">

      <Dialog visible={info} modal
        header={nome}
        footer={footer}
        style={{ width: '40%'}}
        onHide={() => { if (!info) return; setInfo(false); }}>
        <div className="grid mt-1 mb-1">
          <div className="col-7">
            <p>
              <b>Criado em:</b> {data} <br />
              <b>Area:</b> to do <br />
              <b>Tipo:</b> {tipo}
            </p>
          </div>
          <div className="col-3 ml-2">
            <img src={tipo == "Pizza" ? 
              pieChart : tipo == "Barras" ? 
              barChart : tipo == "Linhas" ? 
              lineChart : spreadsheet} alt="" style={{ height: '100px' }} />
          </div>
        </div>

      </Dialog>

      <div className="col-10 font-bold">{nome}</div>

      <div className="col-2 font-bold">
        <i className='card-info-btn fi fi-rr-info'
          onClick={() => setInfo(true)} />
      </div>

      <div className="col-12" style={{ fontSize: '12px' }}>
        Criado em: {data}
        <hr />
      </div>


      <div className="col-12 text-center" style={{ cursor: 'pointer' }}
        onClick={() => navigate("/menu/gerar")}>
        <img src={img} alt="" style={{ height: '100px' }} />
      </div>
    </div>
  )
}

export default Card