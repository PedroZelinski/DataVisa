import React, { useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button';

const Card = ({ img, navigate }) => {
  const [info, setInfo] = useState(false)
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

  const dadosTemplate = {
    nome: "Nome do Template",
    criadoEm: "01/01/2024",
    tipo: "Pizza",
    area: "Vendas por dia"
  }

  return (
    <div className="card-area col-3 grid m-2 ml-4">

      <Dialog visible={info} modal
        header={dadosTemplate.nome}
        footer={footer}
        style={{ width: '40%'}}
        onHide={() => { if (!info) return; setInfo(false); }}>
        <div className="grid mt-1 mb-1">
          <div className="col-7">
            <p>
              <b>Criado em:</b> {dadosTemplate.criadoEm} <br />
              <b>Area:</b> {dadosTemplate.area} <br />
              <b>Tipo:</b> {dadosTemplate.tipo}
            </p>
          </div>
          <div className="col-3 ml-2">
            <img src={img} alt="" style={{ height: '100px' }} />
          </div>
        </div>

      </Dialog>

      <div className="col-10 font-bold">Nome do Modelo</div>

      <div className="col-2 font-bold" style={{ fontSize: '20px' }}>
        <i className='fi fi-rr-info' style={{ cursor: 'pointer' }}
          onClick={() => setInfo(true)} />
      </div>

      <div className="col-12" style={{ fontSize: '12px' }}>
        Criado em: --/--/----
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