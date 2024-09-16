import React from 'react'
import { useOutletContext } from 'react-router-dom'
import user from '../../assets/user.png'

const Perfil = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();

  return (
    <div className='col-12'>
      <div className='grid nested-grid'>

        <div className='col-2 text-center align-content-center' id='frame-perfil'>
          <img src={user} alt="" style={{height: '80px'}}/>
        </div>
        
        <div className='col-10'>
          <div className="grid">
            <div className='font-bold col-12'>{session.nome}</div>
            <div className='col-4'>
              <div>
                {session.email}
              </div>
              <div>
                {session.matricula}Matricula: (To do)
              </div>
            </div>
            <div className='col-4'>
              <div>
                Empresa: {session.empresa}
              </div>
              <div>
                Cargo: {session.departamento}
              </div>
            </div>
            <div className='col-4'>
              <div>
                {session.cnpj}CNPJ: (to do)
              </div>
              <div>
                Nivel: {session.nivelAcesso == 1 ? 
                "Administrador" : session.nivelAcesso == 2 ? 
                "Analista" : "Usuário"}
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className='font-bold mt-5'>Perfil</div>
      <form>
        <div className='grid mt-1'>

          <div className='col-6'>
            <label>E-mail
              <input type="email" id='email'
                defaultValue={session.email}/>
            </label>
            <label>Nome Completo
              <input type="text" id='nome' 
                defaultValue={session.nome}/>
            </label>
          </div>

          <div className='col-6'>
            <label>Senha
              <input type="text" id='senha'/>
            </label>
          </div>
        </div>
      </form>

    </div>
  )
}

export default Perfil