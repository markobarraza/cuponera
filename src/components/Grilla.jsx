import {useContext } from 'react'
import Cupon from './Cupon'
import style from '../styles/grilla.module.css'
import { CuponContext } from '../context/CuponContext'

const Grilla = () => {
  const {datos, grillaRef} = useContext(CuponContext)
  return (
    <div ref={grillaRef} className={style.contenedor}>
      {datos.map(cupon => (
        <Cupon key={cupon.id} cupon={cupon} />
      ))}
    </div>
  )
}

export default Grilla