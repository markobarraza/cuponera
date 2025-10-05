import { useContext, useEffect, useRef } from 'react'
import { ContadorContext } from '../context/ContadorContext'
import '../styles/grilla.css'
import CardContador from './CardContador'
// import { SwapyContext } from '../context/SwapyContext'
import { createSwapy } from 'swapy'

const GrillaContadores = () => {
  const{datos, agregar} = useContext(ContadorContext)
  // const {container} = useContext(SwapyContext)

  const swapy = useRef(null)
    const container = useRef(null)

    useEffect(() => {
      // If container element is loaded
      if (container.current) {
        swapy.current = createSwapy(container.current)

        // Your event listeners
        swapy.current.onSwap((event) => {
          console.log('swap', event);
        })
      }

      return () => {
        // Destroy the swapy instance on component destroy
        swapy.current?.destroy()
      }
    }, [agregar])
  


  return (
    <div  ref={container}  className='Cupon-contenedorGrilla'>
      {datos.map(contador =>(
        <CardContador key={contador.id} contador={contador}/>
      ))}
      {/* <CardContador /> */}
      
    </div>
  )
}

export default GrillaContadores
