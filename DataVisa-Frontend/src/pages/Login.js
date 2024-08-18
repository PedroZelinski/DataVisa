import React, { Component } from 'react'
import LoginHome from '../components/Login/LoginHome'
import LoginCadastro from '../components/Login/LoginCadastro'
import LoginConfirmacao from '../components/Login/LoginConfirmacao'
import LoginSenha from '../components/Login/LoginSenha'
import logo from '../assets/logoOriginal.jpg'
import waves from '../assets/login.jpg'
import './Login.css'

export default class Login extends Component {

  state = {
    modo: 1 //1=inicial, 2=senha, 3=cadastro, 4=confirmacao
  }
  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
  }

  render() {
    return (
      <div className='grid justify-content-center' id='background'>

        <div className='grid mt-6' id="panel">

          <div className='col-6 text-left'>

            <img src={logo} alt="Logo" id="logo" />

            {this.state.modo == 1 ?
              <LoginHome alteraModo={this.alteraModo} />
              :
              this.state.modo == 2 ?
                <LoginSenha alteraModo={this.alteraModo} />
                :
                this.state.modo == 3 ?
                  <LoginCadastro alteraModo={this.alteraModo} />
                  :
                  <LoginConfirmacao alteraModo={this.alteraModo} />
            }

          </div>
          <div className='col-6 p-0 h-full'>
            <img id="waves" src={waves} />
          </div>
        </div >
      </div >
    )
  }
}