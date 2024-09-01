import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/MenuInicial/SideMenu'
import './MenuInicial.css'
import TopMenu from '../components/MenuInicial/TopMenu'

export default class MenuInicial extends Component {

  state = {
    session: JSON.parse(localStorage.getItem('session'))
  }
  componentDidMount(){
    console.log(this.state.session)
  }

  render() {
    return (
      <div className='grid flex justify-content-center' >
        <TopMenu />
        <SideMenu />
        <div id='border' className='col-10 flex'>
          <Outlet context={this.state.session}/>
        </div>
      </div>
    )
  }
}
