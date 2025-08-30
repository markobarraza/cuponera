import React from 'react'
import style from '../styles/home.module.css'
import Formulario from './Formulario'
import Grilla from './Grilla'

const Home = () => {
  return (
    <div className={style.contenedor}>
      <Formulario/>
      <Grilla/>
    </div>
  )
}

export default Home
