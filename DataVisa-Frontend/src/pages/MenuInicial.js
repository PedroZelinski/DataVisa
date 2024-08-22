import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/MenuInicial/SideMenu'
import './MenuInicial.css'
import TopMenu from '../components/MenuInicial/TopMenu'

export default class MenuInicial extends Component {

  state = {
    modo: 1
  }
  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
    console.log(this.state.modo)
  }

  render() {
    return (
      <div className='grid flex justify-content-center' >

        <TopMenu />

        <SideMenu />

        <div id='border' className='col-10 flex'>
          <Outlet />
          
          </div>

      </div>
    )
  }
}
