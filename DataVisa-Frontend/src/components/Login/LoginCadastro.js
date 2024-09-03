import React, { useState } from 'react'
import DBClient from '../../utils/DBClient'

const LoginCadastro = ({ alteraModo }) => {
    const [value, setValue] = useState('');

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
                empresa: document.getElementById('empresa').value,
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
        <div style={{ marginLeft: 20, marginTop: 10 }}>
            <a style={{ fontWeight: 'bold', marginLeft: 20 }}>Cadastre-se</a>

            <form onSubmit={onFormSubmit} onChange={handleChange}>
                <div className='field-div'>
                    <label>Empresa
                        <input className="input-field" placeholder="Empresa"
                            type="text" id="empresa" required />
                    </label>
                </div>

                <div className='field-div'>
                    <label>Nome Completo
                        <input className="input-field" placeholder="Nome"
                            type="text" id="nome" required />
                    </label>
                </div>

                <div className='field-div'>
                    <label>Email
                        <input className="input-field" placeholder="email@email.com"
                            type="email" id="email" required />
                    </label>
                </div>

                <div className='field-div'>
                    <label>Senha
                        <input className="input-field" placeholder="Senha" 
                            type="password" id="senha" required />
                    </label>
                </div>

                <div className='field-div'>
                    <label>Confirmar a senha
                        <input className="input-field" placeholder="Senha"
                            type="password" id="confsenha" required />
                    </label>
                </div>

                <div className='field-div'>
                    <input className="input-button"
                        type="submit"
                        value="Cadastrar" />
                </div>

                <div className='field-div'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique aqui</a>
                </div>
            </form>
        </div>
    )
}
export default LoginCadastro