import React from 'react'
import Card from '../../components/Menu/Card'

import { useNavigate } from 'react-router-dom'


const Recentes = () => {
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

        <div className="col-12 font-bold">Recentes</div>

        <div className="scroll-white grid col-12" style={{ height: 'calc(100vh - 170px)' }}>

          <div className="col-3 grid m-2 ml-4" id='create-btn' onClick={() => navigate("/menu/criar")}>
            <div className="col-12 mt-5 text-center">
              <div>
                <i className='fi fi-rr-plus' style={{ fontSize: "70px" }} />
              </div>
              <div className='mt-3'>Crie seu gráfico ou tabela</div>
            </div>
          </div>

          {cards.map((card) => (
            <Card
              tipo={card.tipo}
              navigate={navigate}
              nome={card.nome}
              data={card.data} />
          ))}

        </div>
      </div>
    </div>
  )
}

export default Recentes