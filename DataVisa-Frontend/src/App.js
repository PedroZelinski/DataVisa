import React from 'react'
import './App.css'
import logo from './assets/logoOriginal.png'
import waves from './assets/login.jpg'
import Login from './components/Login'
import LoginCadastro from './components/LoginCadastro'
import LoginSenha from './components/LoginSenha'

export default class App extends React.Component {

  state = {
    modo: 1
  }
  alteraModo = (newModo) => {
    this.setState({modo : newModo})
  }

  render() {
    return (
      <div className='grid justify-content-center' id='background'>

        <div className='grid  m-8' id="panel">
      
          <div className='col-6 text-left'>
            <img src={logo} alt="Logo" />
            {this.state.modo == 1 ? <Login alteraModo={this.alteraModo}/> 
            : 
            this.state.modo == 2 ? <LoginSenha alteraModo={this.alteraModo}/> 
            : 
            <LoginCadastro alteraModo={this.alteraModo}/>}
            
          </div>
          <div className='col-6 p-0 h-full'>
            <img id="waves" src={waves} />
          </div>
        </div >
      </div >
    )
  }
}
