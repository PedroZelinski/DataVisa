import React, { useEffect, useState, Fragment } from 'react'
import DBClient from '../../utils/DBClient.js'
import { useNavigate, useOutletContext } from 'react-router-dom'

const Usuarios = () => {
  const [users, setUsers] = useState([])
  const [controle, setControle] = useState(0);
  const [session, alteraModo] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      await DBClient.get('/dataVisa/user/getAll').then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
    }
    load()
  }, [controle])

  async function deletarUser(user) {
    try {
      await DBClient.delete('/dataVisa/user/deleteUser',
        { data: user }
      ).then((res) => {
        console.log(res)
        setControle(prevControle => prevControle + 1);
        alert(res.data)
      });
    } catch (error) {
      alert("Ocorreu um erro: " + error.response.status + "\n"
        + error.response.data)
    }
  }

  return (
    <div>
      <div className='grid col-12 font-bold'>

        <div className='col-10'>Gerenciamento de usuarios
          <input type="text" />
        </div>
        <div className='col-2'>
          <button onClick={() => {
            alteraModo(1)
            navigate('/menu')
          }}>Menu</button>
          <button onClick={() => navigate('/menu/cadastro', {
            state: {
              nome: "",
              email: "",
              senha: "",
              departamento: "",
              editaConexao: false,
              editaModelo: false,
              editaSenha: false,
            }
          }
          )}>Adicionar</button>
        </div>

        <div className='col-1 text-center'>N°</div>
        <div className='col-2 text-center'>Nome</div>
        <div className='col-3 text-center'>Email</div>
        <div className='col-1 text-center'>Nivel</div>
        <div className='col-1 text-center'>Status</div>
        <div className='col-2 text-center'>Departamento</div>
        <div className='col-1 text-center'>Data</div>
        <div className='col-1 text-center'>Ações</div>
      </div>
      <hr/>
      <div className="grid col-12 flex justify-content-center" id='user-list'>
        {users.map((user) => (
          <Fragment key={user.email}>
            <div className='col-1 text-center'>{users.indexOf(user) + 1}</div>
            <div className='col-2 text-center'>{user.nome}</div>
            <div className='col-3 text-center'>{user.email}</div>
            <div className='col-1 text-center'>{user.nivelAcesso}</div>
            <div className='col-1 text-center'>Status</div>
            <div className='col-2 text-center'>Departamento</div>
            <div className='col-1 text-center'>Data</div>
            <div className='col-1 text-center'>
              <button onClick={() => navigate('/menu/cadastro', {
                state: user
              }
              )}>Editar</button>
              <button onClick={() => deletarUser(user)}>Deletar</button>
            </div>
          </Fragment>
        ))}
      </div>

    </div>
  )
}

export default Usuarios