import React from 'react'
import logo from '../../assets/logoOriginal.png'

const LoginSenha = ({ alteraModo }) => {
    const spacingStyle = { marginBottom: '16px' };
    return (
        <div className='col-6'>
            <img style={spacingStyle} src={logo} alt="Logo" id="logo-login" /><br />

            <form style={{marginLeft: '20px', marginTop: '10px', marginBottom: '8px'}}>
                <div style={{ width: '100%', color: 'black', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', lineHeight: '37.44px', wordWrap: 'break-word', marginBottom: '8px' }}>
                    Redefinir senha
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

                <div style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start',display: 'inline-flex'}}>
                    <div style={{ alignSelf: 'stretch', color: 'black',fontSize: '14px', fontFamily: 'Inter',fontWeight: '400', lineHeight: '21.84px',wordWrap: 'break-word', spacingStyle}}>
                        Confirme sua senha
                    </div>
                    <div style={{width: 355, height: 35, padding: 12, opacity: 0.40, background: '#C1C7CB',borderRadius: 5, border: '1px #374957 solid', justifyContent: 'space-between',alignItems: 'center', display: 'inline-flex', marginBottom: '8px'}}>
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

                <div style={{ width: 75, height: 36, padding: 10, borderRadius: 5, border: '1px #171F25 solid', justifyContent: 'center', alignItems: 'center', gap: '10px', display: 'inline-flex', spacingStyle, marginBottom: '8px'}}>
                    <input className="input-button"
                    type="submit"
                    value="Confirmar"
                    style={{ color: '#171F25', fontSize: '14px',fontFamily: 'Inter', fontWeight: '400',lineHeight: '37.44px', background: 'transparent', border: 'none',borderRadius: '5px', padding: '10px 20px', cursor: 'pointer' }}/>
                </div>

                <div style={{ width: '100%', height: '100%', marginBottom: '8px' }}>
                    <span style={{ color: '#374957', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word' }}>
                        Já possui conta? 
                    </span>
                    <span
                    onClick={() => alteraModo(1)}
                    style={{ color: '#044BD9', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: '21.84px', wordWrap: 'break-word', cursor: 'pointer' }}>
                        {' '}Clique aqui
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
            </form>
        </div>
    )
}
export default LoginSenha