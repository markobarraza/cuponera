import React from 'react'
import FormularioContadores from './FormularioContadores'
import HomeContadores from './HomeContadores'
import style from '../styles/MainContainer.module.css'

const Contadores = () => {
  return (
    <>
    <div className={style.mainContainer}>
        <FormularioContadores/>
        <HomeContadores/>
    </div>
    </>
  )
}

export default Contadores
