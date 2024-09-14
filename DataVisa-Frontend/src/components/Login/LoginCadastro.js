import React, { useState, useEffect } from 'react'
import DBClient from '../../utils/DBClient'
import { Dropdown } from 'primereact/dropdown'
import logo from '../../assets/logoOriginal.png'

const LoginCadastro = ({ alteraModo }) => {
    const [value, setValue] = useState('');
    const [businessList, setBusinessList] = useState([]);
    const [business, setBusiness] = useState('');
    const spacingStyle = { marginBottom: '2px' };

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
                matricula: "Novo",
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
            <img src={logo} alt="Logo" id="logo-login" style={spacingStyle} /><br />

            <form onSubmit={onFormSubmit} onChange={handleChange}
            style={{marginLeft: '20px', marginTop: '10px', spacingStyle, fontSize: 18 }}>
                <div className='mt-1 font-bold' style={spacingStyle}>Cadastre-se</div>

                <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex', marginBottom: 10 }}>
      
                    <div style={{ alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word' }}>
                        Nome Completo
                    </div>
                    <div style={{ width: 381, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB', borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
                        <input type="text"
                            id="nome"
                            placeholder="Digite seu nome completo"
                            required
                            style={{ flex: '1 1 0', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', background: 'transparent', border: 'none', outline: 'none' }} 
                        />
                    </div>
                </div>
                
                <div className='mt-1' style={{marginBottom: '8px'}}>
                    <label style={{ fontSize: '14px' }}>Empresa
                        <Dropdown
                            value={business} options={businessList}
                            optionLabel="nome" optionValue="id"
                            onChange={(e) => setBusiness(e.value)} 
                            filter required style={{width: "90%", }}/>
                    </label>
                </div>

                <div style={{ width: '100%', height: '100%',    flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                <div style={{ alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word' }}>
                    E-mail
                </div>
                    <div style={{ width: 381, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB', borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', marginBottom: '6px' }}>
                        <input 
                            className="input-field"
                            placeholder="Digite seu e-mail"
                            type="email"
                            id="email"
                            style={{ 
                                flex: '1 1 0', 
                                border: 'none', 
                                outline: 'none', 
                                fontSize: 14, 
                                fontFamily: 'Inter', 
                                fontWeight: '400', 
                                lineHeight: '21.84px' 
                            }}
                        />
                    </div>
                </div>

                <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',display: 'inline-flex'}}>
                    <div style={{ alignSelf: 'stretch', color: 'black',fontSize: '14px', fontFamily: 'Inter',fontWeight: '400', lineHeight: '21.84px',wordWrap: 'break-word', spacingStyle}}>
                        Senha
                    </div>
                    <div style={{width: 381, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB',borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between',alignItems: 'center', display: 'inline-flex', marginBottom: '8px'}}>
                        <input
                            className="input-field"
                            placeholder="Digite sua senha"
                            type="password"
                            id="senha"
                            style={{
                                flex: '1',
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                lineHeight: '21.84px'
                            }}
                        />
                    </div>
                </div>

                <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',display: 'inline-flex'}}>
                    <div style={{ alignSelf: 'stretch', color: 'black',fontSize: '14px', fontFamily: 'Inter',fontWeight: '400', lineHeight: '21.84px',wordWrap: 'break-word', spacingStyle}}>
                        Confirmar Senha
                    </div>
                    <div style={{width: 381, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB',borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between',alignItems: 'center', display: 'inline-flex', marginBottom: '8px'}}>
                        <input
                            className="input-field"
                            placeholder="Digite sua senha novamente"
                            type="password"
                            id="senha"
                            style={{
                                flex: '1',
                                border: 'none',
                                outline: 'none',
                                fontSize: '14px',
                                fontFamily: 'Inter',
                                fontWeight: '400',
                                lineHeight: '21.84px'
                            }}
                        />
                    </div>
                </div>

                <div style={{ width: 70, height: 36, padding: 10, borderRadius: 5, border: '1px #171F25 solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex', spacingStyle, marginBottom: '8px' }}>
                    <button type="submit"
                    style={{ color: '#171F25', fontSize: 14,fontFamily: 'Inter', fontWeight: '400',lineHeight: '37.44px', background: 'transparent', border: 'none', cursor: 'pointer', wordWrap: 'break-word'}}>
                        Cadastrar
                    </button>
                </div>

                <div style={{ width: '100%', height: '100%' }}>
                    <span style={{ color: '#374957', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word' }}>
                        Já possui conta? 
                    </span>
                    <span
                    onClick={() => alteraModo(1)}
                    style={{ color: '#044BD9', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', cursor: 'pointer' }}>
                        {' '}Clique aqui
                    </span>
                </div>
            </form>
        </div>
    )
}
export default LoginCadastro