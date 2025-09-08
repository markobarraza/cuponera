import { useContext } from 'react'
import { CuponContext } from '../context/CuponContext'
import style from '../styles/formulario.module.css'

const Formulario = () => {

    const {eliminarCupon, capturarDatos, formulario, agregar, datos, editandoId, guardarEdicion, descargarHTML,handleUploadHTML} = useContext(CuponContext)
    console.log(datos);
    console.log(eliminarCupon);

  return (
    <div className={style.contenedor}>
        <div className={style.innerContainer}>
            <form onSubmit= {e => {e.preventDefault();  agregar();}}>
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
                    placeholder='URL de una imagen'
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
                
                
                <p className={style.tituloInput}>Fecha de vencimiento</p>
                <div className={style.inputFecha}>
                    <input 
                        type="text"
                        name='dia'
                        placeholder='día'
                        min='1'
                        max='31' 
                        maxLength={2}
                        value={formulario.dia}
                        onChange={capturarDatos}
                        style={{ width: "50px" }}
                    />
                    <input 
                        type="text"
                        name='mes'
                        placeholder='mes'
                        min='1'
                        max='12' 
                        maxLength={2}
                        value={formulario.mes}
                        onChange={capturarDatos}
                        style={{ width: "50px" }}
                    />
                    <input 
                        type="text"
                        name='anio'
                        placeholder='año'
                        min='1900'
                        max='2100' 
                        maxLength={4}
                        value={formulario.anio}
                        onChange={capturarDatos}
                        style={{ width: "70px" }}
                    />
                </div>
                
                <br />
                
                <input 
                    type="text"
                    name='url'
                    placeholder='URL'
                    value={formulario.url}
                    onChange={capturarDatos}
                    // required
                />
                <input type="file" accept=".html" onChange={handleUploadHTML} />



                <br />
                {editandoId
                    ? <button className={style.inputButton} onClick={guardarEdicion} >Editar cupon</button>
                    : <button className={style.inputButton} type='onSubmit'>Agregar cupon</button>
                }
                
                
            </form>
                <button onClick={descargarHTML}>Descargar grilla HTML</button>
        </div>
    </div>
  )
}

export default Formulario
