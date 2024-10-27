import React, { useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DBClient from '../../utils/DBClient.js'

const CadastroTemplate = ({ exibeMensagem }) => {
  const [conexoes, setConexoes] = useState([])
  const [conexao, setConexao] = useState('')
  const [script, setScript] = useState('')
  const [itens, setItens] = useState([])
  const [valores, setValores] = useState({})
  const [retorno, setRetorno] = useState([])

  useEffect(() => {
    const load = async () => {
      await DBClient.get("/dataVisa/database/getAll").then((res) => {
        setConexoes(res.data)
      })
    }
    load();
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      const indentation = '    ';
      const newText = script.substring(0, start) + indentation + script.substring(end);

      setScript(newText);

      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd = start + indentation.length;
      }, 0);
    }
  };
  function formatarQuery(query) {
    return query
      .replace(/\s+/g, ' ')
      .trim();
  }

  async function conectar(nomeDb) {
    try {
      await DBClient.get("/dataVisa/database/connect/" + nomeDb).then(
        () => executarQuery(formatarQuery(script))
      )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }
  async function executarQuery(query) {
    console.log(query)
    try {
      DBClient.post("/dataVisa/template/validateQuery", query,
        { headers: { 'Content-Type': "text/plain" } }).then(
          (res) => {
            console.log(res.data)
            setRetorno(res.data)
            setItens(res.data.itens)
            setValores(res.data.valores)
          }
        )
    } catch (error) {
      exibeMensagem("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  return (
    <div className="col-12">
      <div className="grid nested-grid">

        <div className="col-11 font-bold">Cadastro do Template</div>
        <div className="col-1">
          <button className="cadastro-btn-color"
            type="submit" form='cadastro'>Salvar</button>
        </div>

        <div className="cadastro-area grid col-10 m-2">

          <div className="scroll-white col-12">

            <div className="col-12 grid">
              <div className="col-4">
                <label className='font-bold'>Nome do Template
                  <div className="input-div">
                    <input className="input-field" style={{ background: '#EBEDEE', height: '47.5px' }}
                      type="text" id="nome" placeholder="Nome"
                      required />
                  </div>
                </label>
              </div>
              <div className="col-4">
                <label className='font-bold'>Conexão
                  <Dropdown value={conexao} options={conexoes}
                    optionLabel="nomeConexao" optionValue='nomeConexao'
                    onChange={(e) => setConexao(e.value)}
                    style={{
                      width: "90%", background: '#EBEDEE',
                      border: '1px #374957 solid', opacity: '0.60',
                    }}
                    scrollHeight='125px' virtualScrollerOptions={{ itemSize: 35 }} />
                </label>
              </div>
            </div>

            <div className="col-12 font-bold">Query</div>
            <div className="col-12">OBS: O Select já está inserido na query e não é necessário no script abaixo.</div>
            <div className="col-12">
              <InputTextarea value={script} rows={7} cols={70} id='textarea'
                onChange={(e) => setScript(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="col-1">
              <button className='cadastro-btn-blue'
                onClick={() => conectar(conexao)}>Executar</button>
            </div>

            <div className="col-12 font-bold">Output</div>
            <div className="output-area col-12">
              {itens.length > 0 ? 
                <table>
                  <tr>
                    {itens.map((item) => (
                      <th>{item}</th>
                    ))}
                  </tr>
                  <tr>
                    {valores.map((valor) => (
                      <td>{valor}</td>
                    ))}
                  </tr>
                </table>
              
              : ""}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CadastroTemplate