import React from 'react'
import FormularioCupones from './FormularioCupones'
import HomeCupones from './HomeCupones'
import style from '../styles/MainContainer.module.css'

const Cuponera = () => {
  return (
    <>
    <div className={style.mainContainer}>
      <FormularioCupones/>
      <HomeCupones/>
    </div>
    </>
  )
}

export default Cuponera
