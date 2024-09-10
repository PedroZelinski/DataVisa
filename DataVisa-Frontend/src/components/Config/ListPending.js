import React, { Fragment, useEffect } from 'react'
import DBClient from '../../utils/DBClient';

const ListPending = ({ list, userCadastro, rejeitarUser, navigate, setControle }) => {

  useEffect(() => {
    setControle(prevControle => prevControle + 1)
  }, []);

  return (
    <Fragment>
      <div className='grid col-12 font-bold'>
        <div className='col-1 text-center'>N°</div>
        <div className='col-3 text-center'>Nome</div>
        <div className='col-4 text-center'>Email</div>
        <div className='col-2 text-center'>Data de Solicitação</div>
        <div className='col-2 text-center'>Ações</div>
      </div>
      <div className='col-12'><hr /></div>

      <div className="grid col-12 overflow-auto text-center justify-content-center" id='list'>
        {list.map((user) => (
          <Fragment key={user.email}>
            <div className='col-1'>{list.indexOf(user) + 1}</div>
            <div className='col-3'>{user.nome}</div>
            <div className='col-4'>{user.email}</div>
            <div className='col-2'>Data</div>
            <div className="col-2">
              <button onClick={() => userCadastro(user.email)}>Aceitar</button>
              <button onClick={() => rejeitarUser(user)}>Rejeitar</button>
            </div>
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}

export default ListPending