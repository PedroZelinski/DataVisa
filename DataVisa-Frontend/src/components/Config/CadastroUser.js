import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import DBClient from '../../utils/DBClient'


const CadastroUser = ({ exibeMensagem }) => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [cargo, setCargo] = useState('');
    const [nvAdmin, setNvAdmin] = useState(false)
    const [nvAnalist, setNvAnalist] = useState(false)
    const location = useLocation();
    let user = location.state;
    let cargos = user.departamentos.split(/\s*,\s*/)

    useEffect(() => {
        console.log(user)
        if (user.nivelAcesso == 1) {
            setNvAdmin(true)
        }
        if (user.nivelAcesso == 2) {
            setNvAnalist(true)
        }
        setCargo(user.departamento)
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        const dadosUsuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: user.senha,
            matricula: document.getElementById('matricula').value,
            empresaId: user.empresaId,
            permissaoTabela: cargos.indexOf(cargo),
            nivelAcesso: nvAdmin == true ? 1 : nvAnalist == true ? 2 : 3,
        }
        user.permissaoTabela == 100 ? aprovaUser(dadosUsuario) : salvarUser(dadosUsuario);
        event.preventDefault();
    }

    async function aprovaUser(dadosUsuario) {
        try {
            await DBClient.put("/dataVisa/user/aprovePendingUser", dadosUsuario).then((res) => {
                console.log(res)
                exibeMensagem(res.data)
                navigate("/config/usuarios")
            })

        } catch (error) {
            exibeMensagem("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }
    async function salvarUser(dadosUsuario) {
        console.log(dadosUsuario)
        try {
            await DBClient.put('/dataVisa/user/updateUser',
                dadosUsuario
            ).then((res) => {
                console.log(res)
                exibeMensagem(res.data)
                navigate("/config/usuarios")
            })
        } catch (error) {
            alert("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }

    return (
        <div id='form'>
            <div className='font-bold'>Cadastro do usuário</div>
            <form onSubmit={onFormSubmit} onChange={handleChange}>
                <div className='grid col-12'>

                    <div className="col-5">
                        <label>Nome Completo
                            <div className="input-div">
                                <input className="input-field" style={{background: '#EBEDEE'}}
                                    type="text" id="nome" placeholder="Nome"
                                    defaultValue={user.nome} required />
                            </div>
                        </label>
                        <label>Matricula
                            <div className="input-div" >
                                <input className='input-field' style={{background: '#EBEDEE'}}
                                    type="text" id="matricula" placeholder='Matricula'
                                    defaultValue={user.matricula} required />
                            </div>
                        </label>
                        <label>Empresa
                            <div className="input-div">
                                <input className='input-field' style={{background: '#BAC3CC'}}
                                    type="text" id='empresa' placeholder='Pendente'
                                    defaultValue={user.empresaNome} disabled />
                            </div>
                        </label>
                    </div>

                    <div className="col-5">
                        <label>E-mail
                            <div className="input-div">
                                <input className='input-field' style={{background: '#EBEDEE'}}
                                    type="email" id="email" placeholder="E-mail"
                                    defaultValue={user.email} required />
                            </div>
                        </label>
                        <label>Cargo da Empresa
                            <div className="input-div">
                                <input className='input-field' style={{background: '#BAC3CC'}}
                                    type="text" id='cargo' placeholder='Pendente' disabled
                                    defaultValue={user.departamento} />
                            </div>
                        </label>
                        <label>Nivel de Acesso
                            <div className="input-div">
                                <input className='input-field' style={{background: '#BAC3CC'}}
                                    type="text" id="nivel" disabled
                                    defaultValue={
                                        user.nivelAcesso == 1 ?
                                            "Administrador" : user.nivelAcesso == 2 ?
                                                "Analista" : "Usuário"}
                                    placeholder='Pendente' />
                            </div>
                        </label>
                    </div>
                    <div className="col-2">
                        <input className="cadastro-btn-color"
                            type="submit"
                            value="Salvar"></input>
                    </div>

                </div>
            </form>

            <div className='font-bold'>Permissões do usuario</div>
            <div className='grid nested-grid col-12'>
                <div className='col-5'>
                    <label className='font-bold'>Cargo da Empresa
                        <Dropdown value={cargo} options={cargos}
                            onChange={(e) => setCargo(e.value)} 
                            style={{ width: "90%", background: '#EBEDEE', 
                            border: '1px #374957 solid', opacity: '0.60'}}/>
                    </label>
                </div>

                <div className="grid col-6">
                    <div className='font-bold col-12'>Nivel de acesso</div>
                    <div className="col-4">Administrador</div>
                    <div className="col-8">
                        <InputSwitch checked={nvAdmin} onChange={(e) => {
                            setNvAdmin(e.value)
                            if (e.value == true) {
                                setNvAnalist(!e.value)
                            }
                        }} />
                    </div>

                    <div className="col-4">Analista de Dados</div>
                    <div className="col-8">
                        <InputSwitch checked={nvAnalist} onChange={(e) => {
                            setNvAnalist(e.value)
                            if (e.value == true) {
                                setNvAdmin(!e.value)
                            }
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroUser