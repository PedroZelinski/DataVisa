import React from 'react'

const LoginSenha = ({alteraModo}) => {
    return (
        <div style={{ marginLeft: 20, marginTop: 10 }}>
            <a style={{ fontWeight: 'bold', marginLeft: 20 }}>Redefinir senha</a>

            <form>
                <div className='field-div'>
                    <label>Email
                        <input className="input-field"
                            type="email"
                            id="email"
                            placeholder="email@email.com"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Nova senha
                        <input className="input-field"
                            type="password"
                            id="password"
                            placeholder="Senha"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <label>Confirmar senha
                        <input className="input-field"
                            type="password"
                            id="newpassword"
                            placeholder="Senha"></input>
                    </label>
                </div>

                <div className='field-div'>
                    <input className="input-button"
                        type="submit"
                        value="Confirmar"></input>
                </div>

                <div className='field-div'>
                    Já possui conta?
                    <a onClick={() => alteraModo(1)}
                        className="link"> Clique Aqui</a>
                    <br />
                    Ainda não possui conta?
                    <a onClick={() => alteraModo(3)}
                        className="link"> Cadastre-se</a>
                </div>
            </form>
        </div>
    )
}
export default LoginSenha