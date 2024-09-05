import React, { useEffect, useState, Fragment } from 'react'
import DBClient from '../../utils/DBClient.js'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Pendentes = () => {
    const [users, setUsers] = useState([])
    const [controle, setControle] = useState(0);
    const [session, alteraModo] = useOutletContext();
    const navigate = useNavigate();

    return (
        <div>
            <div className='grid col-12 font-bold'>

                <div className='col-3'>Usuarios Pendentes
                    <input type="text" />
                </div>
                <div className='col-1 col-offset-8'>
                    <button onClick={() => {
                        alteraModo(1)
                        navigate('/menu')
                    }}>Menu</button>
                </div>

                <div className='col-1 text-center'>N°</div>
                <div className='col-2 text-center'>Nome</div>
                <div className='col-3 text-center'>Email</div>
                <div className='col-1 text-center'>Nivel</div>
                <div className='col-1 text-center'>Status</div>
                <div className='col-2 text-center'>Departamento</div>
                <div className='col-1 text-center'>Data</div>
                <div className='col-1 text-center'>Ações</div>
            </div>
            <hr />

            <div className="grid col-12 overflow-auto text-center" id='list'>
                {/* {users.map((user) => (
                    <Fragment key={user.email}>
                        <div className='col-1'>{users.indexOf(user) + 1}</div>
                        <div className='col-2'>{user.nome}</div>
                        <div className='col-3'>{user.email}</div>
                        <div className='col-1'>{user.nivelAcesso}</div>
                        <div className='col-1'>Status</div>
                        <div className='col-2'>Departamento</div>
                        <div className='col-1'>Data</div>
                        <div className='col-1 text-center'>
                            <button onClick={() => navigate('/menu/cadastro', {
                                state: user
                            }
                            )}>Editar</button>
                            <button onClick={() => deletarUser(user)}>Deletar</button>
                        </div>
                    </Fragment>
                ))} */}
            </div>

        </div>
    )
}

export default Pendentes