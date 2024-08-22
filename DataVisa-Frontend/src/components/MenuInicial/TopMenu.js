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
                <input type="text" name="" id="" />
            </div>
            <div className='col-2'>
                <button onClick={() => alert("to do")}>Opções</button><br />
                <button onClick={() => navigate('/menu/perfil')}>Perfil</button>
            </div>

        </div>
    )
}

export default TopMenu