import React, { Component } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import LoginHome from '../components/Login/LoginHome'
import LoginCadastro from '../components/Login/LoginCadastro'
import LoginConfirmacao from '../components/Login/LoginConfirmacao'
import LoginSenha from '../components/Login/LoginSenha'
import waves from '../assets/login.jpg'
import './Login.css'

export default class Login extends Component {

  state = {
    modo: 1, //1=inicial, 2=senha, 3=cadastro, 4=confirmacao
    visible: false,
    message: ""
  }

  footerContent = (
    <div>
      <Button label="Ok" onClick={() => this.setState({ visible: false })} autoFocus />
    </div>
  );
  headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      Aviso
    </div>
  );

  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
  }
  exibeMensagem = (msg) => {
    this.setState({ message: msg, visible: true })
  }

  render() {
    return (
      <div className='grid justify-content-center' id='background'>
        <Dialog visible={this.state.visible} modal
          header={this.headerElement}
          footer={this.footerContent}
          style={{ width: '30%' }}
          onHide={() => { if (!this.state.visible) return; this.setState({ visible: false }); }}>
          <p className="m-0">
            {this.state.message}
          </p>
        </Dialog>

        <div className='grid nested-grid mt-6' id="panel">

          {this.state.modo == 1 ?
            <LoginHome alteraModo={this.alteraModo} exibeMensagem={this.exibeMensagem} />
            :
            this.state.modo == 2 ?
              <LoginSenha alteraModo={this.alteraModo} exibeMensagem={this.exibeMensagem} />
              :
              this.state.modo == 3 ?
                <LoginCadastro alteraModo={this.alteraModo} exibeMensagem={this.exibeMensagem} />
                :
                <LoginConfirmacao alteraModo={this.alteraModo} exibeMensagem={this.exibeMensagem} />
          }

          <div className='col-6 p-0 h-full'>
            <img id="waves" src={waves} />
          </div>

        </div >
      </div >
    )
  }
}