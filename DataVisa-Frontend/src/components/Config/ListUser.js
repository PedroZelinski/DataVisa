import React, { Fragment, useEffect } from 'react'
import Cadastro from '../../pages/subpages/Cadastro';
import DBClient from '../../utils/DBClient';

const ListUser = ({ list, userCadastro, deletarUser, navigate, setControle }) => {

    useEffect(() => {
        setControle(prevControle => prevControle + 1)
    }, []);

    return (
        <Fragment>
            <div className='grid col-12 font-bold'>
                <div className='col-1 text-center'>N°</div>
                <div className='col-2 text-center'>Nome</div>
                <div className='col-3 text-center'>Email</div>
                <div className='col-1 text-center'>Nivel</div>
                <div className='col-2 text-center'>Cargo</div>
                <div className='col-1 text-center'>Data</div>
                <div className='col-2 text-center'>Ações</div>
            </div>
            <div className='col 12'><hr /></div>
            
            <div className="grid col-12 overflow-auto text-center justify-content-center" id='list'>
                {list.map((user) => (
                    <Fragment key={user.email}>
                        <div className='col-1'>{list.indexOf(user) + 1}</div>
                        <div className='col-2'>{user.nome}</div>
                        <div className='col-3'>{user.email}</div>
                        <div className='col-1'>{user.nivelAcesso}</div>
                        <div className='col-2'>{user.departamento}</div>
                        <div className='col-1'>Data</div>
                        <div className="col-2">
                            <button onClick={() => userCadastro(user.email)}>
                                Editar</button>
                            <button onClick={() => deletarUser(user)}>Deletar</button>
                        </div>
                    </Fragment>
                ))}
            </div>
        </Fragment>
    )
}

export default ListUser