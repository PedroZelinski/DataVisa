import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog'
import DBClient from '../../utils/DBClient';

const Conexoes = () => {
  const [dbs, setDbs] = useState([])
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const [controle, setControle] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await DBClient.get("/dataVisa/database/getAll").then((res) => {
        setDbs(res.data)
        console.log(res.data)
      })
    }
    load();
  }, [controle])

  async function conexaoCadastro(id) {
    try {
      await DBClient.get("/dataVisa/database/getDB/" + id).then(
        (res) => {
          console.log(res.data)
          navigate("/config/cadastro/conexao", { state: res.data })
        })
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }
  const confirmDelete = (nomeConexao) => {
    confirmDialog({
      message: 'Deseja mesmo excluir a conexão ' + nomeConexao + '?',
      header: 'Confirmar ação',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      rejectLabel: "Não",
      acceptLabel: "Sim",
      accept() {
        deletarConexao(nomeConexao)
      },
      reject() {
        return
      }
    })
  }
  async function deletarConexao(db) {
    try {
      await DBClient.delete("/dataVisa/database/deleteDB/" + db).then(
        (res) => {
          exibeMensagem(res.data)
          setControle(controle + 1)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  return (
    <div className='col-12'>

      <div className="grid nested-grid">

        <div className="grid col-10">
          <div className='col-12 font-bold'>
            Gerenciamento de Conexões
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
            navigate("/config/cadastro/conexao", {
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
            <div className='col-3'>Nome</div>
            <div className='col-2'>Tipo</div>
            <div className='col-2'>Data de Conexão</div>
            <div className='col-2'>Status</div>
            <div className='col-2'>Ações</div>
            <div className="col-12"><hr /></div>
          </div>

          <div className="scroll-white grid col-12 text-center ml-1 mt-2"
            style={{height: 'calc(100vh - 320px)', width: '99%'}}>
            {dbs.map((db) => (
              <Fragment key={db.id}>
                <div className='col-1'>{db.id}</div>
                <div className='col-3'>{db.nomeConexao}</div>
                <div className='col-2'>{db.tipoDb}</div>
                <div className='col-2'>Data de Conexão</div>
                <div className='col-2'>{db.isActive == 1 ? "Ativo" : "Inativo"}</div>
                <div className='col-2'>
                  <button className='cadastro-btn-blue mr-2'
                    onClick={() => conexaoCadastro(db.id)}>Editar</button>
                  <button className='cadastro-btn-red'
                    onClick={() => confirmDelete(db.nomeConexao)}>Deletar</button>
                </div>
              </Fragment>
            ))}
          </div>

        </div>


      </div>
    </div>
  )
}


export default Conexoes