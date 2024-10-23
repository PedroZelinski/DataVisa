import React from 'react'
import { useNavigate } from 'react-router-dom';

const SideMenu = () => {
    const navigate = useNavigate();

    return (
        <div id='side-menu' className='col-2 text-center'>
            <div>
                <button id='create' className='side-menu-btn' 
                style={{fontWeight: 'bolder', border: 'solid 2px', fontSize: '20px'}}>Criar</button>
            </div>
            <br />
            <div>
                <button className='side-menu-btn' onClick={() => navigate('/menu/recentes')}>
                <i className='fi fi-rr-clock' /><br />Recentes</button>
            </div>
            <br />
            {/* <div>
                <button className='side-menu-btn'>
                <i className='fi fi-rr-share' /><br />Compartilhados</button>
            </div>
            <br /> */}
            <div>
                <button className='side-menu-btn' onClick={() => navigate('/menu/pesquisar')}>
                <i className='fi fi-rr-search' /><br />Pesquisar</button>
            </div>
        </div>
    )
}

export default SideMenu