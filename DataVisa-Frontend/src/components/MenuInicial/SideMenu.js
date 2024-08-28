import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();

    return (
        <div id='side-menu' className='col-2 flex-1'>
            <div>
                <button>Criar</button>
            </div>
            <br />
            <div>
                <button>Recentes</button><br />
                Recentes
            </div>
            <br />
            <div>
                <button>Compartilhados</button><br />
                Compartilhados
            </div>
            <br />
            <div>
                <button onClick={() => navigate('/menu/modelos')}>Pesquisar</button><br />
                Pesquisar
            </div>
        </div>
    )
}

export default SideMenu