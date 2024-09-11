import React, { useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import CadastroUser from '../../components/Config/CadastroUser'
import CadastroDb from '../../components/Config/CadastroDb';

const Cadastro = () => {
    const location = useLocation();

    switch (location.pathname) {
        case "/config/cadastro/usuario":
            return <CadastroUser />
            break;
        case "/config/cadastro/conexao":
            return <CadastroDb />
            break;

        default:
            return alert("Pagina não encontrada")
            break;
    }
    // return (
    //     <Fragment>
    //         {switch (location.pathname) {
    //             case "/config/cadastro/usuario":
    //                 return <CadastroUser />
    //                 break;
            
    //             default:
    //                 break;
    //         }}
    //         <CadastroUser />

    //     </Fragment>
    // )
}

export default Cadastro