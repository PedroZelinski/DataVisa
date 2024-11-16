import React, { useState, useEffect } from 'react'
import DBClient from '../../utils/DBClient'
import { Dropdown } from 'primereact/dropdown'
import logo from '../../assets/logoOriginal.png'

const LoginCadastro = ({ alteraModo, exibeMensagem }) => {
    const [value, setValue] = useState('');
    const [view, setView] = useState(false)
    const [businessList, setBusinessList] = useState([]);
    const [business, setBusiness] = useState('');

    useEffect(() => {
        DBClient.get("/dataVisa/business/getAll").then((res) => {
            setBusinessList(res.data.slice(2))
            console.log(res.data)
        })
    }, []);

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        const senha = document.getElementById('senha').value
        const confsenha = document.getElementById('confsenha').value

        if (senha == confsenha) {
            const dadosUsuario = {
                email: document.getElementById('email').value,
                senha: senha,
                matricula: "Novo",
                nome: document.getElementById('nome').value,
                empresaId: business,
            }
            criarCadastro(dadosUsuario);
        } else {
            exibeMensagem("Senhas digitadas não conferem");
        }
        event.preventDefault();
    }

    async function criarCadastro(dadosUsuario) {
        try {
            await DBClient.post('/dataVisa/user/addUser',
                dadosUsuario
            ).then((res) => {
                if (res.status == 200) {
                    alteraModo(4)
                }
            });
        } catch (error) {
            exibeMensagem("Ocorreu um erro: "
                + error.response.status + " - "
                + error.response.data)
        }
    }

    return (
        <div className="col-6">
            <img src={logo} alt="Logo" id="logo-login" />

            <div className='header-div mt-2'>
                Cadastre-se
            </div>

            <form onSubmit={onFormSubmit} onChange={handleChange}
                className='grid nested-grid mt-1' id='cadastro-form'>
                <div className="scroll-white" style={{ height: "calc(100vh - 260px)" }}>

                    <div className='col-12'>
                        <label>Empresa
                            <Dropdown
                                value={business} options={businessList}
                                optionLabel="nome" optionValue="id"
                                onChange={(e) => setBusiness(e.value)}
                                filter required placeholder="Informe sua empresa"
                                style={{
                                    width: "90%", background: '#C1C7CB',
                                    border: '1px #374957 solid', opacity: '0.60'
                                }} />
                        </label>
                    </div>

                    <div className='col-12'>
                        <label>Nome Completo
                            <div className="input-div">
                                <input className="input-field" placeholder="Digite seu nome completo"
                                    type="text" id="nome" required />
                            </div>
                        </label>
                    </div>

                    <div className='col-12'>
                        <label>E-mail
                            <div className="input-div">
                                <input className="input-field" placeholder="Digite seu e-mail"
                                    type="email" id="email" required />
                            </div>
                        </label>
                    </div>

                    <div className="grid col-12">
                        <div className='col-5'>
                            <label>Senha
                                <div className="input-div">
                                    <input className="input-field" placeholder="Digite sua senha"
                                        type={view == true ? "text" : "password"} id="senha"
                                        minLength={8} required />
                                </div>
                            </label>
                        </div>

                        <div className='col-5'>
                            <label>Confirmar senha
                                <div className="input-div">
                                    <input className="input-field" placeholder="Confirme a senha"
                                        type={view == true ? "text" : "password"} id="confsenha"
                                        minLength={8} required />
                                </div>
                            </label>
                        </div>
                        <div className="col-2 align-content-center pt-5">
                            <i className={view == true ? 'fi fi-rr-eye-crossed' : 'fi fi-rr-eye'}
                                id='eye' onClick={() => setView(!view)} />
                        </div>
                    </div>


                    <div className='submit-div' style={{ marginLeft: '8px' }}>
                        <input className="submit-btn"
                            type="submit"
                            value="Cadastrar" />
                    </div>
                </div>
            </form>
            <div className='mt-2' style={{ marginLeft: '20px' }}>
                Já possui conta?
                <a onClick={() => alteraModo(1)}
                    className="link"> Clique aqui</a>
            </div>

        </div>
    )
}
export default LoginCadastro