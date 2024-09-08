import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import DBClient from '../../utils/DBClient'

const Cadastro = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [nivel, setNivel] = useState('');
    const [nvAdmin, setNvAdmin] = useState(false)
    const [nvAnalist, setNvAnalist] = useState(false)
    const location = useLocation();
    const niveis = [
        { id: 5, nome: "Vendedor", label: "5 - Vendedor" },
        { id: 4, nome: "Gerente", label: "4 - Gerente" },
        { id: 3, nome: "Financeiro", label: "3 - Financeiro" },
        { id: 2, nome: "Contabil", label: "2 - Contabil" },
        { id: 1, nome: "Administração", label: "1 - Adnistração" }
    ]
    let user = location.state;

    useEffect(() => {
        if (user.nivelAcesso == 1) {
            setNvAdmin(true)
        }
        if (user.nivelAcesso == 2) {
            setNvAnalist(true)
        }
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        const dadosUsuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: user.senha,
            empresaId: user.empresaId,
            permissaoTabela: user.permissaoTabela ? user.permissaoTabela : 0,
            nivelAcesso: nvAdmin == true ? 1 : nvAnalist == true ? 2 : 3,
            pending: user.pending == 1 ? 1 : 0
        }
        user.pending == 1 ? aprovaUser(dadosUsuario) : salvarUser(dadosUsuario);
        event.preventDefault();
    }
    async function aprovaUser(dadosUsuario) {
        try {
            await DBClient.put("/dataVisa/user/aprovePendingUser", dadosUsuario).then((res) => {
                console.log(res)
                alert(res.data)
                navigate("/config/usuarios")
            })

        } catch (error) {
            alert("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }
    async function salvarUser(dadosUsuario) {
        try {
            await DBClient.put('/dataVisa/user/updateUser',
                dadosUsuario
            ).then((res) => {
                console.log(res)
                alert(res.data)
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
                        <div className="mt-1">
                            <label>Nome Completo
                                <input type="text" id="nome" placeholder="Nome"
                                    defaultValue={user.nome} required />
                            </label>
                        </div>
                        <div className="mt-1">
                            <label>Matricula
                                <input type="text" defaultValue={"Matricula"} />
                            </label>
                        </div>
                        <div className="mt-1">
                            <label>Empresa
                                <input type="text" id='empresa' disabled
                                    defaultValue={user.empresaNome} />
                            </label>
                        </div>
                    </div>

                    <div className="col-5">
                        <div className="mt-1">
                            <label>E-mail
                                <input type="email" id="email" placeholder="E-mail"
                                    defaultValue={user.email} required />
                            </label>
                        </div>
                        <div className="mt-1">

                            <label>Cargo da Empresa
                                <input type="text" id='cargo' disabled
                                    defaultValue={"Cargo"} />
                            </label>
                        </div>
                        <div className="mt-1">
                            <label>Nivel de Acesso
                                <input type="text" id="nivel" disabled
                                    defaultValue={user.nivelAcesso} />
                            </label>
                        </div>
                    </div>

                    <div className="col-2">
                        <input className="input-button"
                            type="submit"
                            value="Salvar"></input>
                    </div>
                </div>
            </form>

            <div className='font-bold'>Permissões do usuario</div>
            <div className='grid col-12'>
                <div className='col-6'>
                    <label className='font-bold'>Cargo da Empresa
                        <Dropdown value={nivel} options={niveis}
                            optionLabel="nome" optionValue="id"
                            onChange={(e) => setNivel(e.value)} />
                    </label>
                </div>
                <div className="col-6">
                    <div className='font-bold'>Nivel de acesso</div>
                    <label>Administrador
                        <InputSwitch checked={nvAdmin} onChange={(e) => {
                            setNvAdmin(e.value)
                            if (e.value == true) {
                                setNvAnalist(!e.value)
                            }
                        }} />
                    </label>
                    <label>Analista de Dados
                        <InputSwitch checked={nvAnalist} onChange={(e) => {
                            setNvAnalist(e.value)
                            if (e.value == true) {
                                setNvAdmin(!e.value)
                            }
                        }} />
                    </label>
                </div>
            </div>
        </div>
    )
}

export default Cadastro