import React, { Component } from 'react'
import { Menu } from 'primereact/menu'
import { Menubar } from 'primereact/menubar'
import MenuModelos from '../components/MenuInicial/MenuModelos'
import './MenuInicial.css'
export default class MenuInicial extends Component {

  state = {
    modo: 1
  }
  alteraModo = (newModo) => {
    this.setState({ modo: newModo })
  }
  // Opções do menu superior, as abaixo são só de exemplo
  itemsup = [
    {
      label: 'Home',
      icon: 'pi pi-home'
    },
    {
      label: 'Features',
      icon: 'pi pi-star'
    },
    {
      label: 'Projects',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Components',
          icon: 'pi pi-bolt'
        },
        {
          label: 'Blocks',
          icon: 'pi pi-server'
        },
        {
          label: 'UI Kit',
          icon: 'pi pi-pencil'
        },
        {
          label: 'Templates',
          icon: 'pi pi-palette',
          items: [
            {
              label: 'Apollo',
              icon: 'pi pi-palette'
            },
            {
              label: 'Ultima',
              icon: 'pi pi-palette'
            }
          ]
        }
      ]
    },
    {
      label: 'Contact',
      icon: 'pi pi-envelope'
    }
  ];
  // Opções do menu lateral, as abaixo são só de exemplo
  itemsleft = [
    {
      label: 'Options',
      items: [{ label: 'New', icon: 'pi pi-fw pi-plus', command: () => { window.location.hash = "/fileupload"; } },
      { label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr' }]
    },
    {
      label: 'Account',
      items: [{ label: 'Options', icon: 'pi pi-fw pi-cog', command: () => { window.location.hash = "/"; } },
      { label: 'Sign Out', icon: 'pi pi-fw pi-power-off' }]
    }
  ]

  render() {
    return (
      <div className='grid justify-content-center' >

        <div id='border' className='col-12'>
          <Menubar model={this.itemsup} />
        </div>

        <div id='border' className='col-2'>
          <Menu className='side-menu' model={this.itemsleft} />
        </div>

        <div id='border' className='col-10'>
          <MenuModelos />
        </div>

      </div>
    )
  }
}
