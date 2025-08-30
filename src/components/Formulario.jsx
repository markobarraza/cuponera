import { useContext } from 'react'
import { CuponContext } from '../context/CuponContext'
import style from '../styles/formulario.module.css'

const Formulario = () => {

    const {capturarDatos, formulario, agregar, datos} = useContext(CuponContext)
    console.log(datos);
    
    
    

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
                type="text"
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
            <input 
                type="text"
                name='fecha'
                placeholder='dd/mm/aaaa'
                value={formulario.fecha || ""}
                onChange={capturarDatos}
                pattern="\d{2}/\d{2}/\d{4}"
            />
            <br />
            <input 
                type="text"
                name='url'
                placeholder='URL'
                value={formulario.url}
                onChange={capturarDatos}
             />



            <br />
            <button onClick={agregar}>agregar</button>

        </div>
    </div>
  )
}

export default Formulario
