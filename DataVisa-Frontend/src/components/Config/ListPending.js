import React, { useEffect } from 'react'
import Loading from '../../components/Config/Loading.js'

const ListPending = ({ list, userCadastro, confirmDelete, setControle, loading }) => {

  useEffect(() => {
    setControle(prevControle => prevControle + 1)
  }, []);

  function formatarData(data){
    const [ano, mes, dia] = data.split('-');
  
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="cadastro-area grid m-2 mr-3 w-full"
      style={{ height: 'calc(100vh - 250px)' }}>

      <div className='grid col-12 ml-1 font-bold text-center mt-2'
        style={{ height: '50px', width: '97.5%' }}>
        <div className='col-1 text-center'>N°</div>
        <div className='col-3 text-center'>Nome</div>
        <div className='col-3 text-center'>Email</div>
        <div className='col-3 text-center'>Data de Solicitação</div>
        <div className='col-2 text-center'>Ações</div>
        <div className='col-12'><hr /></div>
      </div>

      <div className="scroll-white col-12 text-center ml-1 mt-2"
        style={{ height: 'calc(100vh - 320px)', width: '99%' }}>

        {loading == true ?
          <div className="grid col-4 col-offset-5">
            <Loading color={"blue"} height={100} width={100} />
          </div> :
          list.map((user) => (
            <div className="grid col-12" key={user.email}>
              <div className='col-1 mt-2'>{list.indexOf(user) + 1}</div>
              <div className='col-3 mt-2'>{user.nome}</div>
              <div className='col-3 mt-2'>{user.email}</div>
              <div className='col-3 mt-2'>{formatarData(user.data_solicitacao)}</div>
              <div className='col-2'>
                <button onClick={() => userCadastro(user.email)}
                  className='cadastro-btn-green mr-2'>
                  Aceitar</button>
                <button onClick={() => confirmDelete(user)}
                  className='cadastro-btn-red'>
                  Rejeitar</button>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ListPending