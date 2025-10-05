import React from 'react'
import style from '../styles/NavBar.module.css'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    const setActiveClass = ({ isActive }) => `${style.btnNav} ${isActive ? style.active : ''}`
  return (
    <div className={style.contenedorNavbar}>
      <NavLink className={ setActiveClass } to='/cuponera'>Cuponera</NavLink>
      <NavLink className={ setActiveClass } to='/contadores'>Contadores</NavLink>
    </div>
  )
}

export default NavBar
