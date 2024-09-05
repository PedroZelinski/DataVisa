import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { OverlayPanel } from 'primereact/overlaypanel'
import DBClient from '../../utils/DBClient';
import logo from '../../assets/logoBranco.png'

const TopMenu = ({ alteraModo }) => {
    const navigate = useNavigate();
    const user = useRef(null);
    const config = useRef(null);
    const inspect = useRef(null);

    function navegar(e, panel, path){
        if(path != "perfil"){
            alteraModo(2)
        } else {
            alteraModo(1)
        }
        panel.current.toggle(e)
        navigate('/menu/'+path)
    }

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
            <div className='col-2 flex align-items-center justify-content-center mt-3'>
                <img src={logo} alt="Logo" id="logo-menu" onClick={() => {
                    alteraModo(1)
                    navigate('/menu')
                }}/>
            </div>
            
            <div className='col-3 col-offset-7 flex align-items-center justify-content-center mt-3'>
                <button className="top-menu-btn" onClick={(e) => inspect.current.toggle(e)}>Inspecionar</button>

                    <OverlayPanel ref={inspect}>
                        <button onClick={(e) => {
                            navegar(e, inspect, "conexoes")
                        }}>Conexões</button>
                        <br />
                        <button onClick={(e) => {
                            navegar(e, inspect, "templates")
                        }}>Templates</button>
                    </OverlayPanel>

                <button className="top-menu-btn" onClick={(e) => config.current.toggle(e)}>Configurações</button>
                    <OverlayPanel ref={config}>
                        <button onClick={(e) => {
                            navegar(e, config, "usuarios")
                        }}>Usuarios</button>
                        <br />
                        <button onClick={(e) => {
                            navegar(e, config, "audit")
                        }}>Auditoria</button>
                    </OverlayPanel>

                <button className="top-menu-btn" onClick={(e) => user.current.toggle(e)}>Usuario</button>
                    <OverlayPanel ref={user}>
                        <button onClick={(e) => {
                            navegar(e, user, "perfil")
                        }}>Perfil</button>
                        <br />
                        <button onClick={() => deslogar()}>Sair</button>
                    </OverlayPanel>
            </div>
        </div>
    )
}

export default TopMenu