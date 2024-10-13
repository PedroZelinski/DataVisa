import React, { useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Barras from '../Templates/Barras.js'
import Pizza from '../Templates/Pizza.js'

const CadastroTemplate = () => {
  const [tipo, setTipo] = useState('')
  const [conexao, setConexao] = useState('')
  const [tabela, setTabela] = useState('')

  const tipos = ["Barras", "Pizza"]
  const conexoes = ["Conexao 1", "Conexao 2"] //Temporario
  const tabelas = ["Vendas", "Pedidos"] //Temporario

  const dropstyle = {
    width: "90%", background: '#EBEDEE',
    border: '1px #374957 solid', opacity: '0.60',
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="grid col-12">
          <div className="font-bold col-12">Tipo de grafico</div>
          <div className="col-3">
            <Dropdown value={tipo} options={tipos}
              onChange={(e) => setTipo(e.value)}
              style={dropstyle}
              scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
            />
          </div>
          <div className="col-1 col-offset-7 text-right">
            <button className='cadastro-btn-color'>Salvar</button>
          </div>
        </div>

        <div className="cadastro-area grid col-5 ml-2">
          <div className="scrol-white col-12" style={{ height: 'calc(100vh - 240px)' }}>

            <div className="col-12 p-0">
              <label className='font-bold'>Nome do Template
                <div className="input-div">
                  <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="nome" placeholder="Crie um nome para o template" required />
                </div>
              </label>
            </div>

            <div className="col-12 p-0 mt-2">
              <label className='font-bold'>Conexao do Banco de Dados
                <Dropdown value={conexao} options={conexoes}
                  onChange={(e) => setConexao(e.value)}
                  style={dropstyle}
                  scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                />
              </label>
            </div>

            <div className="grid col-12 mt-2">
              <div className="col-6 p-0">
                <label className='font-bold'>Tabela
                  <Dropdown value={tabela} options={tabelas}
                    onChange={(e) => setTabela(e.value)}
                    style={dropstyle}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                  />
                </label>
              </div>
              <div className="col-6 p-0">
                <label className='font-bold'>Alias
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="alias-tabela" placeholder="Apelido para a tabela" required />
                  </div>
                </label>
              </div>
            </div>


            <div className="col-12" id="border">
              (Lista de todas as colunas)<br />
              Coluna - Text / Alias - Input <br />

            </div>

            <div className="col-12" id="border">
              Condições <br></br>
              - Where - Dropdown / 1 a 2 campos de valor - Inputs<br />
              - Order By - Dropdown / Asc ou Desc - Radio (Pizza não inclui)
            </div>
          </div>

        </div>

        <div className="cadastro-area grid col-6 ml-5">
          <div className="font-bold col-12">Preview </div>
          {/* Preview */}
          {tipo == "Barras" ?
            <Barras
              nome={"Vendas por mes"}
              valores={[10, 45, 30]}
            /> :
            tipo == "Pizza" ?
              <Pizza
                nome={"Grafico de Pizza (1 Coluna)"}
                valores={[25, 16, 9, 5]}
                labels={["150,00", "200,00", "50,00", "20,00"]} /> :
              "Nenhum modelo selecionado"
          }
        </div>

      </div>
    </div>
  )
}

export default CadastroTemplate