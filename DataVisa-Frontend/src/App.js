import React from 'react'
import './App.css'
import logo from './assets/logoOriginal.png'
import waves from './assets/login.jpg'
import LoginHome from './components/LoginHome'
import LoginCadastro from './components/LoginCadastro'
import LoginSenha from './components/LoginSenha'
import LoginConfirmacao from './components/LoginConfirmacao'

export default class App extends React.Component {

  state = {
    modo: 1
  }
  alteraModo = (newModo) => {
    this.setState({modo : newModo})
  }

  fazerLogin = () => {
    alert("to do")
    //
    //Fazer validação de senha
    //

    //
    //Configurar route pro menu inicial
    //
  } 

  render() {
    return (
      <div className='grid justify-content-center' id='background'>

        <div className='grid  m-8' id="panel">
      
          <div className='col-6 text-left'>
            <img src={logo} alt="Logo" />
            {this.state.modo == 1 ? 
              <LoginHome alteraModo={this.alteraModo}
              fazerLogin={this.fazerLogin}/> 
            : 
            this.state.modo == 2 ? 
              <LoginSenha alteraModo={this.alteraModo}/> 
            : 
            this.state.modo == 3 ? 
              <LoginCadastro alteraModo={this.alteraModo}/>
            :
            <LoginConfirmacao alteraModo={this.alteraModo}/>
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
