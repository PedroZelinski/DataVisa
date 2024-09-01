import React from 'react';
import { useNavigate } from 'react-router-dom';
import DBClient from '../../utils/DBClient';

const TopMenu = () => {
    const navigate = useNavigate();

    async function deslogar() {
        try {
            await DBClient.get('/dataVisa/user/logout').then(
                (res) => {
                    console.log(res)
                    if(res.status == 200) {
                        localStorage.clear()
                        alert(res.data)
                        navigate("/")
                    }
                }
            )
        } catch (error) {
            alert("Ocorreu um erro: "+error.response.status+"\n"+
                error.response.data)
            console.log(error)
        }
    }

    return (
        <div id='top-menu' className='grid col-12'>
            <div className='col-2'>
                Logo
            </div>
            <div className="col-8">

            </div>
            <div className='col-2'>
                <button onClick={() => navigate('/menu/usuarios')}>Opções</button><br />
                <button onClick={() => alert("to do")}>Perfil</button>
                <button onClick={() => deslogar()}>Sair</button>
            </div>

        </div>
    )
}

export default TopMenu