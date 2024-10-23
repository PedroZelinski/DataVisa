import React, { useEffect, useState } from 'react'
import { InputTextarea } from 'primereact/inputtextarea';
import DBClient from '../../utils/DBClient.js'

const CadastroTemplate = ({ exibeMensagem }) => {
  const [script, setScript] = useState('')

  return (
    <div className="col-12">
      <div className="grid nested-grid">
        <div className="col-11 font-bold">Cadastro do Template</div>
        <div className="col-1">
          <button className="cadastro-btn-color"
            type="submit" form='cadastro'>Salvar</button>
        </div>

        <div className="scroll col-12">

        <div className="col-12 grid">
          <div className="col-4">
            <label className='font-bold'>Nome do Template
              <div className="input-div">
                <input className="input-field" style={{ background: '#EBEDEE' }}
                  type="text" id="nome" placeholder="Nome"
                  required />
              </div>
            </label>
          </div>

        <div className="col-1 col-offset-6">
          <button className='cadastro-btn-blue'>Executar</button>
        </div>
        </div>

        <div className="col-12 font-bold">Query</div>
        <div className="col-12">
          <InputTextarea value={script} onChange={(e) => setScript(e.target.value)}
            rows={7} cols={100} />
        </div>

        <div className="col-12 font-bold">Output</div>
      </div>
        </div>
    </div>
  )
}

export default CadastroTemplate