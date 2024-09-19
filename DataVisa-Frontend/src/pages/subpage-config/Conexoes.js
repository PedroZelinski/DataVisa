import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import DBClient from '../../utils/DBClient';

const Conexoes = () => {
  const [dbs, setDbs] = useState([])
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const [controle, setControle] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await DBClient.get("/dataVisa/database/getAll").then((res) => {
        setDbs(res.data)
        console.log(res.data)
      })
    }
    load();
  },[controle])

  async function conexaoCadastro(id) {
    try {
      await DBClient.get("/dataVisa/database/getDB/" + id).then(
        (res) => {
          console.log(res.data)
        navigate("/config/cadastro/conexao", { state: res.data })})
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  return (
    <div id='form' style={{ backgroundColor: 'white' }}>
      <div className='grid'>

        <div className='col-3 font-bold'>
          Gerenciamento de Banco de Dados
          <input type="text" />
        </div>

        <div className='col-1 col-offset-8'>
          <button onClick={() => {
            alteraModo(1)
            navigate('/menu')
          }}>Menu</button>
        </div>

        <Fragment>
        <div className='grid col-12 font-bold'>
                <div className='col-1 text-center'>ID</div>
                <div className='col-3 text-center'>Nome</div>
                <div className='col-2 text-center'>Tipo</div>
                <div className='col-2 text-center'>Data de Conexão</div>
                <div className='col-2 text-center'>Status</div>
                <div className='col-2 text-center'>Ações</div>
            </div>
            <div className='col 12'><hr /></div>
            
            <div className="grid col-12 overflow-auto text-center justify-content-center" id='list'>
              {dbs.map((db) => (
                <Fragment key={db.id}>
                  <div className='col-1'>{db.id}</div>
                  <div className='col-3'>{db.nomeConexao}</div>
                  <div className='col-2'>{db.tipoDb}</div>
                  <div className='col-2'>Data de Conexão</div>
                  <div className='col-2'>{db.isActive == 1 ? "Ativo" : "Inativo"}</div>
                  <div className='col-2'>
                    <button onClick={() => conexaoCadastro(db.id)}>Editar</button>
                    <button>Deletar</button>
                  </div>
                </Fragment>
              ))}
            </div>
        </Fragment>

      </div>
    </div>
  )
}


export default Conexoes