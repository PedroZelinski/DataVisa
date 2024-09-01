import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideConfig = ({ alteraModo }) => {
    const navigate = useNavigate();

    return (
        <div id='side-config' className='col-2 flex-1'>
            <div>
                <button onClick={() => navigate('/menu/usuarios')}>Usuarios</button>
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/audit')}>Auditoria</button>
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/conexoes')}>Conexões</button>
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/templates')}>Templates</button>
            </div>
            <br />
            <div>
                <button onClick={() => {
                    alteraModo(1)
                    navigate('/menu')
                }}>Retornar</button>
            </div>
            <br />
        </div>
    )
}

export default SideConfig