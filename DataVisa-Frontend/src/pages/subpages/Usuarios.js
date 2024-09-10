import React, { useEffect, useState } from 'react'
import DBClient from '../../utils/DBClient.js'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import ListUser from '../../components/Config/ListUser.js'
import ListPending from '../../components/Config/ListPending.js'

const Usuarios = () => {
  const [users, setUsers] = useState([])
  const [controle, setControle] = useState(0);
  const [session, alteraModo] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      await DBClient.get('/dataVisa/user/getAll').then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
    }
    const loadPending = async () => {
      await DBClient.get('/dataVisa/user/getAllPending').then((res) => {
        setUsers(res.data)
        console.log(res.data)
      })
    }

    if (location.pathname == "/config/usuarios") {
      loadUsers()
    } else {
      loadPending()
    }
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

  async function aceitarUser(user) {
    const pendingUser = {
      nome: user.nome,
      email: user.email,
      nivelAcesso: 3,
      departamento: "Pendente",
      departamentos: "Pendente",
      empresaNome: user.empresaNome,
      permissaoTabela: null,
      pending: 1
    }
    //alert("to do")
    navigate('/config/cadastro', { state: pendingUser })
  }

  async function rejeitarUser(user) {
    DBClient.delete("/dataVisa/user/refusePendingUser",
      { data: { email: user.email } }).then((res) => {
        setControle(prevControle => prevControle + 1);
        alert(res.data)
      })
  }

  async function cadastroUser(user){
    const cadastro = await DBClient.get("/dataVisa/user/getUser/"+user.email)
    return cadastro
  }

  return (
    <div id='form' style={{ backgroundColor: 'white' }}>
      <div className='grid'>

        <div className='col-3 font-bold'>
          {location.pathname == "/config/usuarios" ? 
            "Gerenciamento de usuarios" : "Usuarios Pendentes"}
          <input type="text" />
        </div>

        <div className='col-1 col-offset-8'>
          <button onClick={() => {
            alteraModo(1)
            navigate('/menu')
            console.log(location.pathname)
          }}>Menu</button>
        </div>

        {location.pathname == "/config/usuarios" ?
          <ListUser
            list={users}
            deletarUser={deletarUser}
            navigate={navigate}
            setControle={setControle}
            cadastroUser={cadastroUser} />
          :
          <ListPending
            list={users}
            aceitarUser={aceitarUser}
            rejeitarUser={rejeitarUser}
            setControle={setControle} />
        }
      </div>
    </div>
  )
}

export default Usuarios