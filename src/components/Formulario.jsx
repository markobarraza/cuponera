import { useContext } from 'react'
import { CuponContext } from '../context/CuponContext'
import style from '../styles/formulario.module.css'

const Formulario = () => {

    const {capturarDatos, formulario, agregar, datos} = useContext(CuponContext)
    console.log(datos);

  return (
    <div className={style.contenedor}>
        <div className={style.innerContainer}>
            <form onSubmit= {e => {e.preventDefault(); agregar();}}>
                <p className={style.tituloInput}>Imagen</p>
                <p className={style.textoInput}>Ingresa un SKU o una url de una imagen</p>
                
                <input 
                    type="text"
                    name='sku'
                    placeholder='0000000'
                    value={formulario.sku}
                    onChange={capturarDatos}
                    required= {formulario.sku === "" && formulario.image === "" ? true : false}
                />
                
                <input 
                    type="text"
                    name='image'
                    placeholder='URL'
                    value={formulario.image}
                    onChange={capturarDatos}
                    required= {formulario.sku === "" && formulario.image === "" ? true : false}
                />
                <br />
                <br />

                <p className={style.tituloInput}>Datos del cupón</p>
                <div className={style.inputDivide}>
                    <input 
                        type="text"
                        name='cupon'
                        placeholder='Nombre del cupón'
                        value={formulario.cupon}
                        onChange={capturarDatos}
                        // required
                    />
                    
                    <br />
                    
                    
                    <input 
                        type="text"
                        name='dcto'
                        placeholder='dcto (solo numero)'
                        inputMode='numeric'
                        pattern='[0-9]*'
                        value={formulario.dcto}
                        onChange={capturarDatos}
                        // required
                    />
                </div>
                <input 
                    type="text"
                    name='llamado'
                    placeholder='Llamado'
                    value={formulario.llamado}
                    onChange={capturarDatos}
                    // required
                />
                
                
                <br />
                <br />
                <input 
                    type="text"
                    name='fecha'
                    placeholder='Fecha vencimiento: 10/8/2025'
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
                    // required
                />



                <br />
                <button type='onSubmit'>agregar</button>
            </form>

        </div>
    </div>
  )
}

export default Formulario
