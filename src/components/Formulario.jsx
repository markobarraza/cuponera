import { useContext } from 'react'
import { CuponContext } from '../context/CuponContext'
import style from '../styles/formulario.module.css'

const Formulario = () => {

    const {capturarDatos, formulario, agregar} = useContext(CuponContext)

    
    

  return (
    <div className={style.contenedor}>
        <div className={style.innerContainer}>
            
            
            <input 
                type="text"
                name='cupon'
                placeholder='Nombre del cupon'
                value={formulario.cupon}
                onChange={capturarDatos}
            />
            <br />
            <input 
                type="number"
                name='dcto'
                placeholder='descuento'
                inputMode='numeric'
                pattern='[0-9]*'
                value={formulario.dcto}
                onChange={capturarDatos}
            />
            <br />
            <input 
                type="text"
                name='llamado'
                placeholder='llamado'
                value={formulario.llamado}
                onChange={capturarDatos}
            />



            <br />
            <button onClick={agregar}>agregar</button>

        </div>
    </div>
  )
}

export default Formulario
