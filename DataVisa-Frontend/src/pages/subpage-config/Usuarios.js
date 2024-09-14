import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import DBClient from '../../utils/DBClient.js'
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

  async function userCadastro(email) {
    try {
      await DBClient.get("/dataVisa/user/getUser/" + email).then(
        (res) => navigate('/config/cadastro/usuario', { state: res.data }))
    } catch (error) {
      alert("Ocorreu um erro: " + error.response.status + "\n" +
        error.response.data)
    }
  }

  const confirmDelete = (user) => {
    const refuseMessage = 'Deseja mesmo recusar o cadastro de ' + user.nome + '?'
    const deleteMessage = 'Deseja mesmo deletar o usuário ' + user.nome + '?'
    confirmDialog({
      message: user.nivelAcesso == 0 ? refuseMessage : deleteMessage,
      header: 'Confirmar ação',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      rejectLabel: "Não",
      acceptLabel: "Sim",
      accept() {
        user.nivelAcesso == 0 ? rejeitarUser(user.email) : deletarUser(user)
      },
      reject() {
        return
      }
    })
  }

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

  async function rejeitarUser(userEmail) {
    DBClient.delete("/dataVisa/user/refusePendingUser",
      { data: { email: userEmail } }).then((res) => {
        setControle(prevControle => prevControle + 1);
        alert(res.data)
      })
  }

  return (
    <div id='form' style={{ backgroundColor: 'white' }}>
      <ConfirmDialog />
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
          }}>Menu</button>
        </div>

        {location.pathname == "/config/usuarios" ?
          <ListUser
            list={users}
            userCadastro={userCadastro}
            confirmDelete={confirmDelete}
            setControle={setControle} />
          :
          <ListPending
            list={users}
            userCadastro={userCadastro}
            confirmDelete={confirmDelete}
            setControle={setControle} />
        }
      </div>
    </div>
  )
}

export default Usuarios