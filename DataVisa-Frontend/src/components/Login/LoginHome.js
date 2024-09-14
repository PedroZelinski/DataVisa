import React from 'react'
import { useNavigate } from 'react-router-dom';
import DBClient from '../../utils/DBClient';
import logo from '../../assets/logoOriginal.png'

const LoginHome = ({ alteraModo }) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        fazerLogin();
        event.preventDefault();
    }
    const spacingStyle = { marginBottom: '16px' };

    async function fazerLogin() {
        try {
            await DBClient.get('/dataVisa/user/login', {
                headers: {
                    email:document.getElementById('email').value,
                    senha: document.getElementById('senha').value,
                }
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('session', JSON.stringify(res.data));
                    localStorage.setItem('modo', 1)
                    navigate('/menu/recentes')
                }
            });
        } catch (error) {
            alert("Ocorreu um erro: "+error.response.status+"\n"+
                error.response.data.mensagemRetorno)
            console.log(error)
        }
    }

    return (
        <div className='col-6'>
            <img src={logo} alt="Logo" id="logo-login" style={spacingStyle} /><br />

            <form onSubmit={onFormSubmit} onChange={handleChange} style={{ marginLeft: '20px', marginTop: '10px' }}>
            <div style={{ width: 467, color: 'black', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: '25px', wordWrap: 'break-word', marginBottom: '8px'}}>
                Digite seu e-mail e senha, para acessar <br />
                sua conta.
            </div>

            <div style={{ width: '100%', height: '100%',    flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex' }}>
                <div style={{ alignSelf: 'stretch', color: 'black', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', spacingStyle }}>
                    E-mail
                </div>
                    <div style={{ width: 355, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB', borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', marginBottom: '6px' }}>
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
                    <div style={{width: 355, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB',borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between',alignItems: 'center', display: 'inline-flex', marginBottom: '8px'}}>
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

                <div style={{ width: 62, height: 36, padding: 10, borderRadius: 5, border: '1px #171F25 solid', justifyContent: 'center', alignItems: 'center', gap: '10px', display: 'inline-flex', spacingStyle, marginBottom: '8px'}}>
                    <input className="input-button"
                    type="submit"
                    value="Acessar"
                    style={{ color: '#171F25', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400',lineHeight: '37.44px', background: 'transparent', border: 'none',borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}/>
                </div>

                <div style={{ width: '100%', height: '100%', spacingStyle}}>
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{ color: '#374957', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word' }}>
                            Esqueceu sua senha? 
                        </span>
                        <span style={{color: '#044BD9', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', cursor: 'pointer'}} onClick={() => alteraModo(2)}>
                            Clique aqui
                        </span>
                    </div>
                    <div>
                        <span style={{color: '#374957', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word'}}>
                            Ainda não possui conta? 
                        </span>
                        <span style={{color: '#044BD9', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', cursor: 'pointer'}} onClick={() => alteraModo(3)}>
                            Cadastre-se
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default LoginHome