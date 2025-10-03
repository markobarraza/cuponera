import {useContext } from 'react'
import style from '../styles/home.module.css'
import GrillaCupones from './GrillaCupones'
import { CuponContext } from '../context/CuponContext'

const Home = () => {
  const {grillaRef} = useContext(CuponContext)
  return (
    <>
    <div ref={grillaRef} className={style.contenedor}>
      <GrillaCupones/>
    </div>
    
    </>
  )
}

export default Home
