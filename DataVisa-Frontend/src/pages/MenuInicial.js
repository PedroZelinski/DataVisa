import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/MenuInicial/SideMenu'
import './MenuInicial.css'
import TopMenu from '../components/MenuInicial/TopMenu'
import SideConfig from '../components/MenuInicial/SideConfig'

export default class MenuInicial extends Component {

  state = {
    modo: localStorage.getItem("modo"),
    session: JSON.parse(localStorage.getItem('session'))
  }

  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
    localStorage.setItem("modo", newModo)
  }

  componentDidMount() {
    console.log(this.state.session)
  }

  render() {
    return (
      <div className='grid'>
        <TopMenu alteraModo={this.alteraModo} />

        {this.state.modo == 1 ?
          <SideMenu alteraModo={this.alteraModo} />
          :
          <SideConfig alteraModo={this.alteraModo} />
        }
        <div className='col-10 flex justify-content-center' id="outlet" style={
          {backgroundColor: this.state.modo == 1 ? 'white' : '#ebedee'}}>
          <Outlet context={[this.state.session, this.alteraModo]} />
        </div>
      </div>
    )
  }
}
