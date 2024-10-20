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

      </div>
    </div>
  )
}

export default Templates