import { useContext } from 'react'
import { ContadorContext } from '../context/ContadorContext'
import '../styles/grilla.css'
import CardContador from './CardContador'

const GrillaContadores = () => {
  const{datos} = useContext(ContadorContext)


  return (
    <div className='Cupon-contenedorGrilla'>
      {datos.map(contador =>(
        <CardContador key={contador.id} contador={contador}/>
      ))}
      {/* <CardContador /> */}
      
    </div>
  )
}

export default GrillaContadores
