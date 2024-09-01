import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Cadastro = () => {
    const [value, setValue] = React.useState('');
    const location = useLocation();
    let user = location.state;

    // useEffect(() => {
    //     console.log(location)
    // })

    const handleChange = (event) => {
        setValue(event.target.value);
    }
    const onFormSubmit = (event) => {
        salvarCadastro();
        event.preventDefault();
    }

    async function salvarCadastro(){
        alert("to do")
    }

    return (
        <div>
            <h1>Cadastro de Usuario</h1> {/* Colocar texto variavel */}
            <form onSubmit={onFormSubmit}>
                <div className='grid col-12' id='border'>
                    <div className="grid col-5">

                        <label>Nome Completo
                            <input type="text" defaultValue={user.nome} onChange={handleChange}/>
                        </label>
                        <label>Matricula
                            <input type="text" defaultValue={"Matricula"} />
                        </label>
                        <label>Telefone
                            <input type="text" defaultValue={"11 99999-9999"} />
                        </label>
                        <label>E-mail
                            <input type="text" defaultValue={user.email} />
                        </label>

                    </div>
                    <div className="grid col-5">

                        <label>Data de Nascimento
                            <input type="text" defaultValue={"01/01/2024"} />
                        </label>
                        <label>Departamento
                            <input type="text" defaultValue={"Departamento"} />
                        </label>
                        <label>Localidade
                            <input type="text" defaultValue={"Localidade"} />
                        </label>
                        <label>Senha
                            <input type="text" defaultValue={user.senha} />
                        </label>
                    </div>
                    <div className="col-2">
                        <input className="input-button"
                            type="submit"
                            value="Salvar"></input>
                    </div>
                </div>
            </form>
            <h1>Permissões do Usuario</h1>
        </div>
    )
}

export default Cadastro