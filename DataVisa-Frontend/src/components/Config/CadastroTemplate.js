import React from 'react'
import { Dropdown } from 'primereact/dropdown'
import Barras from '../Templates/Barras.js'

const CadastroTemplate = () => {

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="col-12">
          Tipo de grafico
        </div>

        <div className="grid col-5">
          <div className="col-12" id="border">
            Tabela
          </div>

          <div className="col-12" id="border">
            Colunas e Operações
          </div>

          <div className="col-12" id="border">
            Condição Where
          </div>

          <div className="col-12" id="border">
            Condição Order By
          </div>
        </div>

        <div className="col-7">
          Preview
          
          <Barras
            valores={[10, 45, 30]}
            nome={"Vendas por mes"} />
        </div>

      </div>
    </div>
  )
}

export default CadastroTemplate