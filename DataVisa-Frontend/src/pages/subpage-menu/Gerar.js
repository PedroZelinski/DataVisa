import React from 'react'
import logo from '../../assets/logoOriginal.png'
import Pizza from '../../components/Templates/Pizza.js'
import { useNavigate } from 'react-router-dom'
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Gerar = () => {
  const navigate = useNavigate()

  const printDoc = () => {
    const input = document.getElementById('resultado')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(
        {orientation: "landscape",
          format: [300, 150]
        }
      )
      pdf.addImage(imgData, 'JPEG', 0, 0)
      pdf.save("DataVisa.pdf")
    })
  }

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="col-12 grid">
          <div className="col-11 font-bold" style={{ fontSize: '25px' }}>
            Resultado
          </div>
          <div className="col-1">
            <button className='cadastro-btn-blue' onClick={() => navigate("/menu/recentes")}>
              Concluir</button>
          </div>
        </div>

        <div className="card-area grid ml-3 mb-3 mr-3 w-full">
          
          <div className='col-9 grid' id='resultado'>
            <div className="col-2 mt-4 ml-4">
              <img src={logo} alt="" style={{ height: "90px" }} />
            </div>

            <div className="col-9">
              <Pizza
                valores={["25", "30", "67", "6"]}
                labels={["Text 1", "Text 2", "Text 3", "Text 4"]}
                layout={
                  {
                    width: 535,
                    height: 350,
                    title: "Grafico de Teste",
                    margin: {
                      r: 30, l: 110, t: 40, b: 20
                    }
                  }
                }
              />
            </div>
          </div>

          <div className="col-3 text-center">
            <div className="col-12">
              <button className='gerar-btn'>
                Visualizar <i className='fi-rr-eye ml-1' />
              </button>
            </div>
            <div className="col-12">
              <button className='gerar-btn' onClick={() => printDoc()}>
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