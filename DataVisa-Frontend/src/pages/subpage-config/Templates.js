import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const Templates = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className='col-12'>
      <div className="grid nested-grid">

        <div className="grid col-10">
          <div className='col-12 font-bold'>
            Gerenciamento de Templates
          </div>
          <div className='cadastro-area grid col-5 m-2'>
            <i className='fi fi-rr-search mr-2 pt-2' />
            <input type="text" placeholder="Pesquisar pelo nome"
              style={{ border: 'none', width: '92%' }} />
          </div>
        </div>

        <div className='col-2 pr-5 pl-5'>
          <button className='cadastro-btn-blue m-1 w-full' onClick={() => {
            alteraModo(1)
            navigate('/menu')
          }}>Menu</button>
          <button className='cadastro-btn-blue m-1 w-full' onClick={() =>
            navigate("/config/cadastro/template", {
              state: {
                nomeConexao: null,
                isActive: 0
              }
            })}>Adicionar</button>
        </div>

        <div className="cadastro-area grid m-2 mr-3 w-full"
          style={{ height: 'calc(100vh - 250px)' }}>

          <div className='grid col-12 ml-1 font-bold text-center mt-2' 
            style={{ height: '50px', width: '99%' }}>
            <div className='col-1'>ID</div>
            <div className='col-4'>Nome</div>
            <div className='col-3'>Conexão</div>
            <div className='col-2'>Data</div>
            <div className='col-2'>Ações</div>
            <div className="col-12"><hr /></div>
          </div>

          <div className="scroll-white grid col-12 text-center ml-1 mt-2"
            style={{height: 'calc(100vh - 320px)', width: '99%'}}>
            
          </div>

        </div>

      </div>
    </div>
  )
}

export default Templates