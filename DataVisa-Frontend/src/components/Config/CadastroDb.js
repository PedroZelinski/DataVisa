import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'

const CadastroDb = () => {
  const [value, setValue] = useState('');
  const [tipo, setTipo] = useState('')
  const [ativo, setAtivo] = useState(true)
  let tipos = ["MySQL", "MongoDB", "SQL Server"]

  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const onFormSubmit = (event) => {
    alert("teste")
    event.preventDefault();
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
          <input className="cadastro-btn-color"
            type="submit" form='cadastro'
            value="Salvar"></input>
        </div>
      </div>

      <div className="scroll">

        <form id='cadastro' onChange={{ handleChange }} onSubmit={{ onFormSubmit }}>
          <div className='grid col-12'
            style={{ background: 'white', borderRadius: '5px' }}>

            <div className="col-5">
              <label>Nome da Conexao
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="nome" placeholder="Nome para a conexao"
                    defaultValue={"Conexao"} required />
                </div>
              </label>
              <label>Tipo
                <Dropdown value={tipo} options={tipos}
                  onChange={(e) => setTipo(e.value)}
                  style={{
                    width: "90%", background: '#EBEDEE', height: '35px',
                    border: '1px #374957 solid', opacity: '0.60'
                  }}
                  scrollHeight='125px'
                  virtualScrollerOptions={{ itemSize: 35 }} />
              </label>
              <label>Nome do banco de dados
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="nomedb" placeholder="Nome da instância do banco"
                    defaultValue={"Nome BD"} required />
                </div>
              </label>
              <label>Usuario do banco de dados
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="userdb" placeholder="Nome do usuário do banco"
                    defaultValue={"root"} required />
                </div>
              </label>

            </div>
            <div className="col-5">
              <label>Porta
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="portdb" placeholder="Porta do banco de dados"
                    defaultValue={"8080"} required />
                </div>
              </label>
              <label>Dominio
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="hostdb" placeholder="Dominio do banco de dados"
                    defaultValue={"localhost"} required />
                </div>
              </label>
              <label>Caminho
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="text" id="caminhodb" placeholder="Caminho do banco de dados"
                    defaultValue={"/db"} required />
                </div>
              </label>
              <label>Senha
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE' }}
                    type="password" id="senhadb" placeholder="Senha do usuario do banco"
                    required />
                </div>
              </label>
            </div>
          </div>
        </form>

        <div className="grid nested-grid col-6 mt-3">
          Permissões de tabela
          <div className='col-12'>
            <input type="text" />
          </div>
          <div className="grid col-12 mt-2" style={{ background: 'white', borderRadius: '5px' }}>
            <div className="col-8" >
              Nome da tabela
            </div>
            <div className="col-4">
              Nivel de Acesso
            </div>
            <div className="col-8" >
              Nome da tabela
            </div>
            <div className="col-4">
              Nivel de Acesso
            </div>
            <div className="col-8" >
              Nome da tabela
            </div>
            <div className="col-4">
              Nivel de Acesso
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CadastroDb