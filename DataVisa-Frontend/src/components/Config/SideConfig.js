import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const SideConfig = ({ alteraModo, nivel }) => {
    const navigate = useNavigate();
    const location = useLocation();

    function selected(path) {
        if (path == location.pathname) {
            return {color: 'white', border: 'solid 2px', borderRadius: '10px'}
        }
    }

    return (
        <div id='side-config' className='col-2 text-center'>
            {nivel <= 1 ? <div>
                <div>
                    <button onClick={() => navigate('/config/usuarios')}
                        className='side-config-btn' style={selected("/config/usuarios")}>
                        <i className='fi fi-rr-user' /> Usuarios</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/config/pendentes')}
                        className='side-config-btn' style={selected("/config/pendentes")}>
                        <i className='fi fi-rr-shield-exclamation' /> Pendentes</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/config/audit')}
                        className='side-config-btn' style={selected("/config/audit")}>
                        <i className='fi fi-rr-shield-check' /> Auditoria</button>
                </div>
                <br />
            </div> : <div />}
            {nivel <= 2 ? <div>
                <div>
                    <button onClick={() => navigate('/config/conexoes')}
                        className='side-config-btn' style={selected("/config/conexoes")}>
                        <i className='fi fi-rr-database' /> Conexões</button>
                </div>
                <br />
                <div>
                    <button onClick={() => navigate('/config/templates')}
                        className='side-config-btn' style={selected("/config/templates")}>
                        <i className='fi fi-rr-chart-histogram' /> Templates</button>
                </div>
                <br />
            </div> : <div />}
            <div>
                <button onClick={() => {
                    alteraModo(1)
                    navigate('/menu')
                }} className='side-config-btn'>
                    <i className='fi fi-rr-undo-alt' /> Retornar</button>
            </div>
        </div>
    )
}

export default SideConfig