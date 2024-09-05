import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideConfig = ({ alteraModo }) => {
    const navigate = useNavigate();

    const acesso = 0;

    return (
        <div id='side-config' className='col-2 text-center'>
            {acesso <= 1 ? <div>
                <div>
                    <button onClick={() => navigate('/menu/usuarios')}
                        className='side-config-btn'>
                        <i className='icon-black fi fi-rr-user' /> Usuarios</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/menu/pendentes')}
                        className='side-config-btn'>
                        <i className='icon-black fi fi-rr-shield-exclamation' /> Pendentes</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/menu/audit')}
                        className='side-config-btn'>
                        <i className='icon-black fi fi-rr-shield-check' /> Auditoria</button>
                </div>
                <br />
            </div> : <div />}
            {acesso <= 2 ? <div>
                <div>
                    <button onClick={() => navigate('/menu/conexoes')}
                        className='side-config-btn'>
                        <i className='icon-black fi fi-rr-database' /> Conexões</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/menu/templates')}
                        className='side-config-btn'>
                        <i className='icon-black fi fi-rr-chart-histogram' /> Templates</button>
                </div>
                <br />
            </div> : <div />}
            <div>
                <button onClick={() => {
                    alteraModo(1)
                    navigate('/menu')
                }} className='side-config-btn' style={{ color: 'white' }}>
                    <i className='icon-white fi fi-rr-undo-alt' /> Retornar</button>
            </div>
        </div>
    )
}

export default SideConfig