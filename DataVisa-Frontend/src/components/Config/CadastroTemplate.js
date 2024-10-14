import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import Barras from '../Templates/Barras.js'
import Pizza from '../Templates/Pizza.js'
import DBClient from '../../utils/DBClient.js'

const CadastroTemplate = ({ exibeMensagem }) => {
  const [tipo, setTipo] = useState('')
  const [conexao, setConexao] = useState('')
  const [conexoes, setConexoes] = useState([])
  const [tabela, setTabela] = useState('')
  const [tabelas, setTabelas] = useState([])
  const [coluna, setColuna] = useState('')
  const [colunas, setColunas] = useState([])
  const tipos = ["Barras", "Pizza", "Linhas", "Planilha"]

  const dropstyle = {
    width: "90%", background: '#EBEDEE',
    border: '1px #374957 solid', opacity: '0.60',
  }

  useEffect(() => {
    const load = async () => {
      await DBClient.get("/dataVisa/database/getAll").then(
        (res) => setConexoes(res.data)
      )
    }
    load()
  }, [])
  async function conectar(nomeConexao) {
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeConexao).then(
        () => buscarTabelas()
      )

    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function buscarTabelas() {
    try {
      await DBClient.get("/dataVisa/tableSaw/getConnecionTables").then(
        (res) => {
          setTabelas(res.data.split('\r\n'))
          console.log(res)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  async function buscarColunas(tabela) {
    try {
      await DBClient.get("/dataVisa/tableSaw/getTableColumns/" + tabela).then(
        (res) => {
          sortColumns(res.data)
        }
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }
  function sortColumns(res) {

    const lista = res.split("\n")
    lista.pop()
    let newLista = []

    lista.forEach(element => {
      const partes = element.split(" | ")
      newLista.push(
        {
          nomeColuna: partes[0].split(": ")[1],
          tipo: partes[1].split(": ")[1],
          alias: ""
        })
    })
    setColunas(newLista)
  }
  function defineAlias() {
    const index = colunas.findIndex(obj => obj == coluna)
    colunas[index].alias = document.getElementById("alias-coluna").value
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="grid col-12">
          <div className="font-bold col-2">Tipo de grafico</div>
          <div className="col-3">
            <Dropdown value={tipo} options={tipos}
              onChange={(e) => setTipo(e.value)}
              style={dropstyle}
              scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
            />
          </div>
          <div className="col-1 col-offset-6 text-right">
            <button className='cadastro-btn-color' onClick={() => console.log(colunas)}>Salvar</button>
          </div>
        </div>

        <div className="cadastro-area grid col-5 ml-2">
          <div className="scroll-white col-12" style={{ height: 'calc(100vh - 240px)' }}>

            <div className="col-12 p-0">
              <label className='font-bold'>Nome do Template
                <div className="input-div">
                  <input className="input-field"
                    style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="nome"
                    placeholder="Crie um nome para o template" required />
                </div>
              </label>
            </div>

            <div className="col-12 p-0 mt-2">
              <label className='font-bold'>Conexao do Banco de Dados
                <Dropdown value={conexao} options={conexoes}
                  optionLabel="nomeConexao" optionValue='nomeConexao'
                  onChange={(e) => {
                    setConexao(e.value)
                    conectar(e.value)
                  }}
                  style={dropstyle}
                  scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                />
              </label>
            </div>

            <div className="col-12 p-0 mt-2">
              <label className='font-bold'>Tabela
                <Dropdown value={tabela} options={tabelas}
                  onChange={(e) => {
                    setTabela(e.value)
                    buscarColunas(e.value)
                  }}
                  style={dropstyle}
                  scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                />
              </label>
            </div>

            <div className="col-12 p-0 mt-2">
              <label className='font-bold'>Apelido da Tabela
                <div className="input-div">
                  <input className="input-field"
                    style={{ background: '#EBEDEE', height: '47.5px' }}
                    type="text" id="alias-tabela"
                    placeholder="Defina um apelido para a tabela" required />
                </div>
              </label>
            </div>


            <div className="col-12 p-0 mt-2">
              <div className="grid">

                <div className="col-6">
                  <label className='font-bold'>Colunas
                    <Dropdown value={coluna} options={colunas}
                      optionLabel="nomeColuna"
                      onChange={(e) => {
                        document.getElementById("alias-coluna").value = e.value.alias
                        setColuna(e.value)
                      }}
                      style={dropstyle}
                      scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }}
                    />
                  </label>
                </div>

                <div className="col-6">
                  <label className='font-bold'>Apelido da Coluna
                    <div className="input-div">
                      <input className="input-field"
                        style={{ background: '#EBEDEE', height: '47.5px' }}
                        type="text" id="alias-coluna"
                        placeholder="Um apelido para a coluna" required 
                        onChange={() => defineAlias()}/>
                    </div>
                  </label>
                </div>

              </div>
            </div>

            <div className="col-12" id="border">
              Condições <br></br>
              - Where - Dropdown / 1 a 2 campos de valor - Inputs<br />
              - Order By - Dropdown / Asc ou Desc - Radio (Pizza não inclui)
            </div>
          </div>

        </div>

        <div className="cadastro-area grid col-6 ml-5">
          <div className="font-bold col-12">Preview</div>
          <div className="col-12 p-0">
          </div>
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