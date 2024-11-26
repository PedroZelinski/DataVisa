import React from 'react'
import { Dialog } from 'primereact/dialog'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const VisualizarModelo = ({ height, modelo, view, setView }) => {

  function values() {
    const trimmedValues = modelo.reportValues[0].split(', ').map(item => item.trim())
    const parsedValues = trimmedValues.map(item => parseFloat(item.replace(',', '.')))

    return parsedValues
  }
  function labels() {
    const trimmedValues = modelo.reportValues[0].split(', ').map(item => item.trim())
    const parsedValues = trimmedValues.map(item => parseFloat(item.replace(',', '.')))
    const defaultLabels = parsedValues.map((_, index) => `Valor ${index + 1}`)

    if (modelo.labels !== undefined) return modelo.labels
    else return defaultLabels
  }

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
            {modelo.graphType == "pie" ?
              <Pizza
                valores={values()}
                labels={labels()}
                layout={
                  {
                    width: 850,
                    height: height - 120,
                    title: modelo.reportName,
                    font: {
                      size: 18,
                    },
                    margin: {
                      r: 30, l: 110, t: 60, b: 20
                    }
                  }
                }
              />
              : modelo.graphType == "bar" ?
                <Barras
                  valores={values()}
                  labels={labels()}
                  layout={
                    {
                      width: 700,
                      height: height - 120,
                      title: modelo.reportName,
                      margin: {
                        r: 30, l: 50, t: 50, b: 30
                      }
                    }} />
                : modelo.graphType == "scatter" ?
                  <Linhas
                    valores={values()}
                    labels={labels()}
                    layout={
                      {
                        width: 700,
                        height: height - 120,
                        title: modelo.reportName,
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