import React, { useState } from 'react'
import Card from '../../components/Menu/Card'
import PesquisarFiltros from '../../components/Menu/PesquisarFiltros'
import { useNavigate } from 'react-router-dom'

const Pesquisar = () => {
  const [checkedTodos, setCheckedTodos] = useState(true);
  const [checkedPizza, setCheckedPizza] = useState(true);
  const [checkedLinhas, setCheckedLinhas] = useState(true);
  const [checkedBarras, setCheckedBarras] = useState(true);
  const [checkedPlan, setCheckedPlan] = useState(true);
  const navigate = useNavigate();
  
  const cards = [
    {
      nome: "Pizzas mais vendidas",
      tipo: "Pizza",
      data: "27/02/2024"
    },
    {
      nome: "Vendas semanais",
      tipo: "Barras",
      data: "16/02/2024"
    },
    {
      nome: "Lucro diário",
      tipo: "Linhas",
      data: "15/02/2024"
    },
    {
      nome: "Vendas por entregador",
      tipo: "Planilha",
      data: "29/01/2024"
    }, {
      nome: "Comissões",
      tipo: "Pizza",
      data: "23/01/2024"
    }
  ]

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
                qtd={cards.length}/>

            </div>
          </div>

          <div className="grid col-9 ml-2">
            <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 220px)' }}>

              {cards.map((card) => (
                card.tipo == "Pizza" && checkedPizza == true ||
                  card.tipo == "Barras" && checkedBarras == true ||
                  card.tipo == "Linhas" && checkedLinhas == true ||
                  card.tipo == "Planilha" && checkedPlan == true ?
                  <Card
                    imgHeight={80}
                    tipo={card.tipo}
                    navigate={navigate}
                    nome={card.nome}
                    data={card.data} />
                  : null
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Pesquisar