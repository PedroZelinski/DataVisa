import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import DBClient from '../../utils/DBClient'

const Cadastro = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [nivel, setNivel] = useState('');
    const [edTemplate, setEdTemplate] = useState(false)
    const [edConexao, setEdConexao] = useState(false)
    const [edSenha, setEdSenha] = useState(false)
    const location = useLocation();
    const niveis = ["0 - Administrador", "1 - Gerente", "2- Operador"]
    let user = location.state;

    useEffect(() => {
        if (user.editaModelo == 1) {
            setEdTemplate(true)
        }
        if (user.editaConexao == 1) {
            setEdConexao(true)
        }
        if (user.editaSenha == 1) {
            setEdSenha(true)
        }
    }, [])

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        const dadosUsuario = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value,
            empresaId: user.empresaId ? user.empresaId : 8,
            //departamento: document.getElementById('departamento'),
            editaModelo: edTemplate == true ? 1 : 0,
            editaConexao: edConexao == true ? 1 : 0,
            //editaSenha: edS = edSenha == true ? 1 : 0,
            permissaoTabela: user.permissaoTabela ? user.permissaoTabela : 0,
            nivelAcesso: user.nivelAcesso ? user.nivelAcesso : 0,
        }
        user.email == "" ? criarCadastro(dadosUsuario) : salvarCadastro(dadosUsuario);
        event.preventDefault();
    }
    async function criarCadastro(dadosUsuario) {
        try {
            await DBClient.post('/dataVisa/user/addUser',
                dadosUsuario
            ).then((res) => {
                console.log(res)
                alert(res.data)
                navigate("/menu/usuarios")
            })

        } catch (error) {
            alert("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }
    async function salvarCadastro(dadosUsuario) {
        alert("to do")
        try {
            await DBClient.put('/dataVisa/user/updateUser', 
                dadosUsuario
            ).then((res) => {
                console.log(res)
                alert(res.data)
                navigate("/menu/usuarios")
            })
        } catch (error) {
            alert("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }

    return (
        <div>
            <h1>{user.email == "" ? "Cadastro de usuário" : "Alterar dados do usuário"}</h1>
            <form onSubmit={onFormSubmit}>
                <div className='grid col-12' id='border'>
                    <div className="grid col-5">
                        <label>Nome Completo
                            <input type="text" id="nome" placeholder="Nome" 
                                defaultValue={user.nome} onChange={handleChange} required/>
                        </label>
                        <label>Matricula
                            <input type="text" defaultValue={"Matricula"} />
                        </label>
                        <label>Telefone
                            <input type="text" defaultValue={"11 99999-9999"} />
                        </label>
                        <label>E-mail
                            <input type="email" id="email" placeholder="E-mail" 
                                defaultValue={user.email} onChange={handleChange} required/>
                        </label>

                    </div>
                    <div className="grid col-5">

                        <label>Data de Nascimento
                            <input type="text" defaultValue={"01/01/2024"} />
                        </label>
                        <label>Departamento
                            <input type="text" id="departamento"
                                placeholder="Departamento" defaultValue={"Departamento"} onChange={handleChange} />
                        </label>
                        <label>Localidade
                            <input type="text" defaultValue={"Localidade"} />
                        </label>
                        <label>Senha
                            <input type="password" id="senha" placeholder="Senha" 
                                defaultValue={user.senha} onChange={handleChange} required/>
                        </label>
                    </div>
                    <div className="col-2">
                        <input className="input-button"
                            type="submit"
                            value="Salvar"></input>
                    </div>
                </div>
            </form>
            <h1>Permissões do usuario</h1>
            <form onSubmit={onFormSubmit}>
                <div className='grid col-12' id='border'>
                    <div className='col-6'>
                        <label>Nivel de acesso
                            <Dropdown value={nivel} options={niveis} onChange={(e) => setNivel(e.value)}/>
                        </label>
                    </div>
                    <div className="col-6">
                        <label>Edita Templates
                            <InputSwitch checked={edTemplate} onChange={(e) => setEdTemplate(e.value)} />
                        </label>
                        <label>Edita Conexões
                            <InputSwitch checked={edConexao} onChange={(e) => setEdConexao(e.value)} />
                        </label>
                        <label>Edita Senha
                            <InputSwitch checked={edSenha} onChange={(e) => setEdSenha(e.value)} />
                        </label>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Cadastro