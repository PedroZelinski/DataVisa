import React from 'react'
import Card from '../../components/Menu/Card'
import plus from '../../assets/plus.png'
import barrasDefault from '../../assets/barrasDefault.png'
import pizzaDefault from '../../assets/pizzaDefault.png'
import linhaDefault from '../../assets/linhaDefault.png'
import { useNavigate } from 'react-router-dom'

const Recentes = () => {
  const navigate = useNavigate();
  const gerar = () => navigate("/menu/gerar")

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="col-12">Recentes</div>

        <div className="scroll-white grid col-12">

          <div className="col-3 grid m-2" id='create-btn' onClick={() => navigate("/menu/criar")}>
            <div className="col-12 mt-3 text-center">
              <img src={plus} alt="" style={{ height: "80px" }} />
            </div>
            <div className="col-12 p-0 text-center" id='text-color'
              style={{ fontSize: "15px" }}>
              Crie seu grafico ou tabela
            </div>
          </div>

          <Card img={barrasDefault} gerar={gerar}></Card>
          <Card img={pizzaDefault} gerar={gerar}></Card>
          <Card img={linhaDefault} gerar={gerar}></Card>
          <Card img={barrasDefault} gerar={gerar}></Card>
          <Card img={pizzaDefault} gerar={gerar}></Card>
          <Card img={linhaDefault} gerar={gerar}></Card>
          <Card img={barrasDefault} gerar={gerar}></Card>
          <Card img={pizzaDefault} gerar={gerar}></Card>
          <Card img={linhaDefault} gerar={gerar}></Card>
        </div>

      </div>
    </div>
  )
}

export default Recentes