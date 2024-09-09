import React, { useState, useEffect } from 'react'
import DBClient from '../../utils/DBClient'
import { Dropdown } from 'primereact/dropdown'
import logo from '../../assets/logoOriginal.png'

const LoginCadastro = ({ alteraModo }) => {
    const [value, setValue] = useState('');
    const [businessList, setBusinessList] = useState([]);
    const [business, setBusiness] = useState('');

    useEffect(() => {
        DBClient.get("/dataVisa/business/getAll").then((res) => {
            setBusinessList(res.data)
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
                nome: document.getElementById('nome').value,
                empresaId: business,
            }
            criarCadastro(dadosUsuario);
        } else {
            alert("Senhas digitadas não conferem");
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
            alert("Ocorreu um erro: " + error.response.status + "\n"
                + error.response.data)
        }
    }

    return (
        <div className="col-6">
            <img src={logo} alt="Logo" id="logo-login" /><br />

            <form onSubmit={onFormSubmit} onChange={handleChange}
            style={{marginLeft: '20px', marginTop: '10px'}}>
                <div className='mt-1 font-bold'>Cadastre-se</div>

                <div className='mt-1'>
                    <label>Empresa
                        <Dropdown
                            value={business} options={businessList}
                            optionLabel="nome" optionValue="id"
                            onChange={(e) => setBusiness(e.value)} 
                            filter required style={{width: "90%"}}/>
                    </label>
                </div>

                <div className='mt-1'>
                    <label>Nome Completo
                        <input className="input-field" placeholder="Nome"
                            type="text" id="nome" required />
                    </label>
                </div>

                <div>
                    <label>Email
                        <input className="input-field" placeholder="email@email.com"
                            type="email" id="email" required />
                    </label>
                </div>

                <div className='mt-1'>
                    <label>Senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="senha" required />
                    </label>
                </div>

                <div className='mt-1'>
                    <label>Confirmar senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="confsenha" required/>
                    </label>
                </div>

                <div className='mt-1'>
                    <input className="input-button"
                        type="submit"
                        value="Cadastrar" />
                </div>

                <div className='mt-1'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique aqui</a>
                </div>
            </form>
        </div>
    )
}
export default LoginCadastro