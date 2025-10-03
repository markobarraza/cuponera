import { useContext } from 'react'
import style from '../styles/home.module.css'
import GrillaContadores from './GrillaContadores'
import { ContadorContext } from '../context/ContadorContext'

const HomeContadores = () => {
  const {grillaRef}= useContext(ContadorContext)
  return (
    <div ref={grillaRef} className={style.contenedor}>
      <GrillaContadores/>
      
    </div>
  )
}

export default HomeContadores
