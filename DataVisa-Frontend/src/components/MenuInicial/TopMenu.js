import React from 'react'
import { useNavigate } from 'react-router-dom';

const TopMenu = () => {
    const navigate = useNavigate();

    return (
        <div id='border' className='grid col-12'>
            <div className='col-2'>
                Logo
            </div>
            <div className="col-8">
                
            </div>
            <div className='col-2'>
                <button onClick={() => navigate('/menu/usuarios')}>Opções</button><br />
                <button onClick={() => alert("to do")}>Perfil</button>
            </div>

        </div>
    )
}

export default TopMenu