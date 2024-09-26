import React, { Fragment, useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import { useLocation } from 'react-router-dom';
import DBClient from '../../utils/DBClient';

const CadastroDb = ({ exibeMensagem }) => {
  const [value, setValue] = useState('');
  const [tipo, setTipo] = useState('')
  const [contador, setContador] = useState(1)
  const [ativo, setAtivo] = useState(true)
  const [testado, setTestado] = useState(false)
  const [tables, setTables] = useState([])
  const location = useLocation();
  let db = location.state;
  let tipos = ["MySQL", "MongoDB", "SQL Server"]
  const cargos = ["Administrador","Gerente","Atendente"]

  useEffect(() => {
    setTipo(db.tipoDb)
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const onFormSubmit = (event) => {
    const dadosConexao = {
      nomeConexao: document.getElementById('nome').value,
      tipoDb: tipo,
      nomeDb: document.getElementById('nomedb').value,
      usuarioDb: document.getElementById('userdb').value,
      portDb: document.getElementById('portdb').value,
      hostName: document.getElementById('hostdb').value,
      caminhoDb: document.getElementById('caminhodb').value,
      senhaDb: document.getElementById('senhadb').value
    }

    testeConexao(dadosConexao)
    event.preventDefault();
  }
  const handleDropdownChange = (e, id) => {
    const index = tables.findIndex(obj => obj.id == id)
    const cargo = cargos.indexOf(e)
    
    tables[index].permissaoAcesso = cargo
    setContador(contador + 1)
  }
  async function testeConexao(dadosConexao) {
    try {
      await DBClient.post("/dataVisa/database/testConnection", dadosConexao).then(
        (res) => {
          exibeMensagem(res.data)
          setTestado(true)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
    setTestado(true)
  }
  async function conectar(nomeDb) {
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
        (res) => buscarTabelas()
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function buscarTabelas() {
    try {
      await DBClient.get("/dataVisa/table/getTablesPermitions").then(
        (res) => {
          console.log(res.data)
          setTables(res.data.tablesPermitions)
        }
      )

    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function salvarConexao() {
    testado == true ? alert("salvo") : alert("não foi testado")
  }

  return (
    <div className='col-12'>

      <div className="grid">
        <div className="col-3">Cadastro de Banco de dados</div>
        <div className="col-2 col-offset-6">
          Ativo
          <InputSwitch checked={ativo} onChange={(e) => {
            setAtivo(e.value)
          }} />
        </div>
        <div className="col-1 mb-3">
          <button className="cadastro-btn-color"
            type="submit" onClick={() => salvarConexao()}>Salvar</button>
        </div>
      </div>

      <div className="scroll">

        <form id='cadastro' onChange={handleChange} onSubmit={onFormSubmit}>
          <div className='cadastro-area grid col-12'>

            <div className="col-5">
              <label>Nome da Conexao
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="nome" placeholder="Nome para a conexao"
                    defaultValue={db.nomeConexao} required />
                </div>
              </label>
              <label className='mt-2'>Tipo
                <Dropdown value={tipo} options={tipos}
                  onChange={(e) => setTipo(e.value)}
                  style={{
                    width: "90%", background: '#EBEDEE',
                    border: '1px #374957 solid', opacity: '0.60',
                  }}
                  scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                  defaultValue={db.tipoDb} />
              </label>
              <label className='mt-2'>Nome do banco de dados
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="nomedb" placeholder="Nome da instância do banco"
                    defaultValue={db.nomeDb} required />
                </div>
              </label>
              <label className='mt-2'>Usuario do banco de dados
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="userdb" placeholder="Nome do usuário do banco"
                    defaultValue={db.usuarioDb} required />
                </div>
              </label>

            </div>
            <div className="col-5">
              <label>Porta
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="portdb" placeholder="Porta do banco de dados"
                    defaultValue={db.portDb} required />
                </div>
              </label>
              <label className='mt-2'>Dominio
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="hostdb" placeholder="Dominio do banco de dados"
                    defaultValue={db.hostName} required />
                </div>
              </label>
              <label className='mt-2'>Caminho
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="caminhodb" placeholder="Caminho do banco de dados"
                    defaultValue={db.caminhoDb} required />
                </div>
              </label>
              <label className='mt-2'>Senha
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="password" id="senhadb" placeholder="Senha do usuario do banco"
                    defaultValue={db.senhaDb} required />
                </div>
              </label>
            </div>
            <div className="relative col-1 col-offset-1 h-auto">
              <input className="cadastro-btn-blue absolute bottom-0 mb-1"
                type="submit" value="Testar" />
            </div>
          </div>
        </form>

        <div className="grid nested-grid col-6 mt-3">
          <div className='font-bold'>Permissões de tabela</div>

          <div className='cadastro-area grid col-9 mt-2'>
            <i className='fi fi-rr-search mr-2 pt-1' />
            <input type="text" placeholder="Pesquisar por tabela"
              style={{ border: 'none', height: '100%' }} />
          </div>
          <div className='col-2 col-offset-1'>
            <button className='cadastro-btn-blue' onClick={() => conectar(db.nomeConexao)}>
              Buscar
            </button>
          </div>

          <div className="cadastro-area grid col-12 mt-2">
            <div className="col-7 font-bold" >
              Nome da tabela
            </div>
            <div className="col-5 font-bold">
              Nivel de Acesso
            </div>
            {tables.map((table) => (
              <Fragment key={table.id}>
                <div className="col-7 pt-3" >
                  {table.nome}
                </div>
                <div className="col-5">
                  {/* {cargos[table.permissaoAcesso]} */}
                  <Dropdown value={cargos[table.permissaoAcesso]} options={cargos}
                  onChange={(e) => {
                    handleDropdownChange(e.value, table.id)
                  }}
                  style={{ width: "100%"}}
                  scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}/>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroDb