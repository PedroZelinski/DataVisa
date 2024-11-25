import React from 'react'
import { Dialog } from 'primereact/dialog'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const VisualizarModelo = ({ height, tipo, valores, labels, nome, view, setView }) => {
  return (
    <Dialog visible={view} modal
      onHide={() => { if (!view) return; setView(false); }}
      content={({ hide }) => (
        <div className='grid text-center'
          style={{ borderRadius: "5px", backgroundColor: "white", minWidth: "800px" }}>

          <div className="col-1 ">
            <button className='cadastro-btn-blue' onClick={(e) => hide(e)}>
              Fechar</button>
          </div>

          <div className="col-12">
            {tipo == "Gráfico de Pizza" ?
              <Pizza
                valores={["25", "30", "67", "6"]}
                labels={["Text 1", "Text 2", "Text 3", "Text 4"]}
                layout={
                  {
                    width: 850,
                    height: height - 120,
                    title: "Grafico de Teste",
                    font: {
                      size: 18,
                    },
                    margin: {
                      r: 30, l: 110, t: 60, b: 20
                    }
                  }
                }
              />
              : tipo == "Gráfico de Barras" ?
                <Barras
                  valores={[31, 23, 57]}
                  labels={["Valor 1", "Valor 2", "Valor 3"]}
                  layout={
                    {
                      width: 700,
                      height: height - 120,
                      title: "Grafico de Exemplo",
                      margin: {
                        r: 30, l: 50, t: 50, b: 30
                      }
                    }} />
                : tipo == "Gráfico de Linhas" ?
                  <Linhas
                    valores={[15, 5, 12, 43]}
                    labels={["Valor 1", "Valor 2", "Valor 3", "valor 4"]}
                    layout={
                      {
                        width: 700,
                        height: height - 120,
                        title: "Grafico de Exemplo",
                        margin: {
                          r: 30, l: 50, t: 50, b: 30
                        }
                      }}
                  /> :
                  <Planilha
                    labels={["Id", "Data", "Responsavel", "Valor"]}
                    valores={[
                      [1, 2, 3],
                      ["10/01/2024", "12/01/2024", "23/02/2024"],
                      ["Rafael", "Jhonatan", "Pedro"],
                      ["R$ 199,99", "R$ 350,00", "R$ 264,50"]
                    ]}
                    layout={
                      {
                        width: 700,
                        height: height - 120,
                        title: "Planilha de Exemplo",
                        margin: {
                          r: 30, l: 50, t: 50, b: 30
                        }
                      }}
                  />
            }
          </div>
        </div>
      )}
    ></Dialog>
  )
}

export default VisualizarModelo