import React, { useEffect, useState } from 'react'
import DBClient from '../../utils/DBClient.js'
import { useNavigate } from 'react-router-dom'

const Usuarios = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      await DBClient.get('/dataVisa/user/getAll').then((res) => {
        setUsers(res.data)
        console.log(users)
      })
    }
    load()
  }, [])

  async function deletarUser(user) {
    try{
      await DBClient.delete('/dataVisa/user/deleteUser', 
        {data: user}
      ).then((res) => {
        console.log(res)
        alert("Cadastro excluido")
      });
    } catch (error) {
      alert("Ocorreu um erro: "+error.response.status+" "+error.response.data)
    }
  }

  return (
    <div className='grid col-12'>
      <div className='col-10'>Gerenciamento de usuarios
        <input type="text" />
      </div>
      <div className='col-2'>
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button>Adicionar</button>
      </div>

      <div className='col-1'>N°</div>
      <div className='col-2'>Nome</div>
      <div className='col-3'>Email</div>
      <div className='col-1'>Nivel</div>
      <div className='col-1'>Status</div>
      <div className='col-2'>Departamento</div>
      <div className='col-1'>Data</div>
      <div className='col-1'>Ações</div>

      {users.map((user) => (
        <React.Fragment key={user.email}>
          <div className='col-1'>{users.indexOf(user)+1}</div>
          <div className='col-2'>{user.nome}</div>
          <div className='col-3'>{user.email}</div>
          <div className='col-1'>{user.nivelAcesso}</div>
          <div className='col-1'>Status</div>
          <div className='col-2'>Departamento</div>
          <div className='col-1'>Data</div>
          <div className='col-1'>
            <button>Editar</button>
            <button onClick={() => deletarUser(user)}>Deletar</button>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Usuarios