import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Pizza from '../../components/Templates/Pizza'
import { useNavigate } from 'react-router-dom'

const Filtrar = ({ modelo }) => {
  const navigate = useNavigate()
  const [area, setArea] = useState('')
  const [item, setItem] = useState('')
  const [order, setOrder] = useState('Crescente')
  const [orderBy, setOrderBy] = useState('')
  const [where, setWhere] = useState('')

  const areas = ["area 1", "area 2"]
  const items = ["item 1", "item 2"]
  const orders = ["Crescente", "Decrescente"]
  const wheres = ["Igual a", "Maior que", "Menor que", "Entre"]

  const dropStyle = {
    width: "90%",
    background: '#EBEDEE',
    border: '1px #374957 solid',
    opacity: '0.60',
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="col-10">Crie uma personalização para o modelo</div>
        <div className="col-2">
          <button className='cadastro-btn-blue' onClick={() => navigate("/menu/gerar")}>
            Avançar</button>
        </div>

        <div className="col-12 grid mt-2">
          <div className="card-area col-5 grid ml-3">
            <div className="scroll-white col-12">
              <div className="col-12 grid">

                <label className='font-bold col-10'>Nome do Modelo
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE' }}
                      type="text" id="nome" placeholder="Nome" required />
                  </div>
                </label>

                <label className='font-bold col-6'>Área
                  <Dropdown value={area} options={areas}
                    onChange={(e) => setArea(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-6'>Item
                  <Dropdown value={item} options={items}
                    onChange={(e) => setItem(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>
                <label className='font-bold col-6'>Ordenação
                  <Dropdown value={order} options={orders}
                    onChange={(e) => setOrder(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-6'>Ordenar por
                  <Dropdown value={orderBy} options={items}
                    onChange={(e) => setOrderBy(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                <label className='font-bold col-6'>Limite
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="limit" placeholder="Valor limite" required />
                  </div>
                </label>

                <label className='font-bold col-6'>Condição
                  <Dropdown value={where} options={wheres}
                    onChange={(e) => setWhere(e.value)} style={dropStyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>

                {where != '' ?
                  <label className='font-bold col-6'>{where == "Entre" ? "Valor minimo" : "Valor"}
                    <div className="input-div">
                      <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                        type="text" id="valor" required />
                    </div>
                  </label> : <div />}

                {where == "Entre" ?
                  <label className='font-bold col-6'>Valor Maximo
                    <div className="input-div">
                      <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                        type="text" id="valorMax" required />
                    </div>
                  </label> : <div />}
              </div>
            </div>
          </div>


          <div className="card-area grid col-6 ml-4">
            <Pizza
              valores={["25", "30", "67", "6"]}
              labels={["Valor 1", "Valor 2", "Valor 3", "Valor 4"]}
              layout={
                {
                  width: 500,
                  height: 350,
                  title: "Grafico de Exemplo",
                  margin: {
                    r: 30, l: 110, t: 40, b: 20
                  }
                }
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filtrar