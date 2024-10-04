import React, { Fragment, useEffect } from 'react'

const ListPending = ({ list, userCadastro, confirmDelete, setControle }) => {

  useEffect(() => {
    setControle(prevControle => prevControle + 1)
  }, []);

  return (
    <div className="cadastro-area grid m-2 mr-3 w-full"
      style={{ height: 'calc(100vh - 250px)' }}>

      <div className='grid col-12 ml-1 font-bold text-center mt-2'
        style={{ height: '50px', width: '99%' }}>
        <div className='col-1 text-center'>N°</div>
        <div className='col-3 text-center'>Nome</div>
        <div className='col-3 text-center'>Email</div>
        <div className='col-3 text-center'>Data de Solicitação</div>
        <div className='col-2 text-center'>Ações</div>
        <div className='col-12'><hr /></div>
      </div>

      <div className="scroll-white grid col-12 text-center ml-1 mt-2"
        style={{ height: 'calc(100vh - 320px)', width: '99%' }}>
        {list.map((user) => (
          <Fragment key={user.email}>
            <div className='col-1 mt-2'>{list.indexOf(user) + 1}</div>
            <div className='col-3 mt-2'>{user.nome}</div>
            <div className='col-3 mt-2'>{user.email}</div>
            <div className='col-3 mt-2'>Data</div>
            <div className='col-2'>
              <button onClick={() => userCadastro(user.email)}
                className='cadastro-btn-green mr-2'>
                Aceitar</button>
              <button onClick={() => confirmDelete(user)}
                className='cadastro-btn-red'>
                Rejeitar</button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default ListPending