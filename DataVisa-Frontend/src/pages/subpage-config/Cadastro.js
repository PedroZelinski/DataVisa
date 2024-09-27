import React from 'react'
import { useLocation, useOutletContext } from 'react-router-dom'
import CadastroUser from '../../components/Config/CadastroUser'
import CadastroDb from '../../components/Config/CadastroDb';

const Cadastro = () => {
    const [session, alteraModo, exibeMensagem] = useOutletContext();
    const location = useLocation();

    switch (location.pathname) {
        case "/config/cadastro/usuario":
            return <CadastroUser exibeMensagem={exibeMensagem}/>
            break;
        case "/config/cadastro/conexao":
            return <CadastroDb 
                exibeMensagem={exibeMensagem}
                session={session}/>
            break;
        default:
            return alert("Pagina não encontrada")
            break;
    }
}

export default Cadastro