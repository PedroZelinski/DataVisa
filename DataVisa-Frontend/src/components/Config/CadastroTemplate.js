import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Barras from '../Templates/Barras.js'
import Pizza from '../Templates/Pizza.js'

const CadastroTemplate = () => {
  const [tipo, setTipo] = useState('')
  const tipos = ["Barras", "Pizza"]

  const dropstyle = {
    width: "90%", background: '#EBEDEE',
    border: '1px #374957 solid', opacity: '0.60',
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="grid col-12">
          <div className="col-2">Tipo de grafico</div>
          <div className="col-2">
            <Dropdown value={tipo} options={tipos}
              onChange={(e) => setTipo(e.value)}
              style={dropstyle}
              scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
            />

          </div>
        </div>
        
        <div className="grid col-5">
        <div className="scroll col-12">
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

        </div>

        <div className="col-7">
          {/* Preview */}
          {tipo == "Barras" ?
            <Barras
              nome={"Vendas por mes"}
              valores={[10, 45, 30]}
            /> :
            tipo == "Pizza" ?
              <Pizza
                nome={"Pedidos por Plataforma do Dia"}
                valores={[25, 16, 9, 5]}
                labels={["iFood", "Uber Eats", "Goomer", "Rappi"]}/> : 
              "Nenhum modelo selecionado"
          }
        </div>

      </div>
    </div>
  )
}

export default CadastroTemplate