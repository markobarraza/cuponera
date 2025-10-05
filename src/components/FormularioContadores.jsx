import {useContext, useState} from 'react'
import style from '../styles/formulario.module.css'
import { ContadorContext } from '../context/ContadorContext'

const FormularioContadores = () => {

  const{capturarDatos, agregar, formulario, setFormulario, guardarEdicion, editandoId, descargarHTML, handleUploadHTML } = useContext(ContadorContext)

  const togglePrecio = () => {
    setFormulario(f => ({ ...f, precioCheck: true, dctoCheck: false, precioUnicoCheck:false }));
  };
  const toggleDcto = () => {
    setFormulario(f => ({ ...f, precioCheck: false, dctoCheck: true, precioUnicoCheck:false }));
  };
  const togglePrecioUnico = () => {
    setFormulario(f => ({ ...f, precioCheck: false, dctoCheck: false, precioUnicoCheck:true }));
  };

  return (
    
    <div className={style.contenedor}>
            <div className={style.innerContainer}>
              <div className={style.tituloFormulario}>
                  <i className={`fa-solid fa-alarm-clock ${style.iconTitulo}`}></i>
                  <div className={style.lineDivisor}></div>
                  <h2>Contadores</h2>
              </div>
                <form onSubmit= {e => {e.preventDefault();  agregar();}}>
                    <p className={style.tituloInput}>Imagen</p>
                    <p className={style.textoInput}>Ingresa un SKU o una url de una imagen</p>
                    
                    <input 
                        type="text"
                        name='sku'
                        placeholder='0000000'
                        value={formulario.sku}
                        onChange={capturarDatos}
                        // required= {formulario.sku === "" && formulario.image === "" ? true : false}
                    />
                    
                    <input 
                        type="text"
                        name='image'
                        placeholder='URL de una imagen'
                        value={formulario.image}
                        onChange={capturarDatos}
                        // required= {formulario.sku === "" && formulario.image === "" ? true : false}
                    />
                    <br />
                    <br />
    
                    <p className={style.tituloInput}>Llamados</p>
                        <input 
                            type="text"
                            name='marca'
                            placeholder='marca'
                            value={formulario.marca}
                            onChange={capturarDatos}
                            // required
                        />
                        <br />
                        
                        
                        <input 
                            type="text"
                            name='descripcion'
                            placeholder='Descripción Principal'
                            value={formulario.descripcion}
                            onChange={capturarDatos}
                            // required
                        />
                        <input 
                            type="text"
                            name='subllamado'
                            placeholder='Descripción secundaria'
                            value={formulario.subllamado}
                            onChange={capturarDatos}
                            // required
                        />



                        <div className={style.inputDivideCheck}> 
                          <label>
                            <input
                            className={style.inputCheck}
                              type="checkbox"
                              name='precioCheck'
                              checked={formulario.precioCheck}
                              onChange={togglePrecio}
                            />
                            <p className={style.selectCheck}>Precios</p>
                          </label>
                          
                          <label>
                            <input
                             className={style.inputCheck}
                              type="checkbox"
                              name='dctoCheck'
                              checked={formulario.dctoCheck}
                              onChange={toggleDcto}
                            />
                            <p className={style.selectCheck}>Descuento</p>
                          </label>

                          <label>
                            <input
                             className={style.inputCheck}
                              type="checkbox"
                              name='precioUnicoCheck'
                              checked={formulario.precioUnicoCheck}
                              onChange={togglePrecioUnico}
                            />
                            <p className={style.selectCheck}>Precio unico</p>
                          </label>
                        </div>
                    
                        {formulario.precioCheck && (
                          <>
                            <p className={style.tituloInput}>Precios</p>
                            <div className={style.inputDivide}>
                              <input 
                                    type="text"
                                    name='PrecioOferta'
                                    placeholder='Precio Oferta'
                                    value={formulario.PrecioOferta}
                                    onChange={capturarDatos}
                                  />
                              
                              
                              <input 
                                type="text"
                                name='PrecioTMP'
                                placeholder='Todo medio de pago'
                                value={formulario.PrecioTMP}
                                onChange={capturarDatos}
                              />

                              {
                                formulario.ou && (
                                  <input 
                                type="text"
                                name='PrecioNormal'
                                placeholder='Normal'
                                value={formulario.PrecioNormal}
                                onChange={capturarDatos}
                              />
                                )
                                
                              }
                              
                            </div>

                            <label className={style.inputCheckOU}>
                              <input
                                type="checkbox"
                                name='ou'
                                checked={formulario.ou}
                                onChange={capturarDatos}
                              />
                              OU
                          </label>
                          </>
                        )}


                        {formulario.dctoCheck && (
                          <>
                            <p className={style.tituloInput}>Descuento</p>
                            <div className={style.inputDivide}>

                              
                              <input 
                                type="text"
                                name='dcto'
                                placeholder='dcto'
                                value={formulario.dcto}
                                onChange={capturarDatos}
                              />


                            </div>
                            <label className={style.inputCheckOU}>
                              <input
                                type="checkbox"
                                name='oudcto'
                                checked={formulario.oudcto}
                                onChange={capturarDatos}
                              />
                              OU
                          </label>
                          </>
                        )}


                        {formulario.precioUnicoCheck && (
                          <>
                            <p className={style.tituloInput}>Precio Unico</p>
                            <div className={style.inputDivide}>

                              
                              <input 
                                type="text"
                                name='Precio2x'
                                placeholder='Precio unico'
                                value={formulario.Precio2x}
                                onChange={capturarDatos}
                              />
                            </div>

                            <label className={style.inputCheckOU}>
                              <input
                                type="checkbox"
                                name='ouPrecioUnico'
                                checked={formulario.ouPrecioUnico}
                                onChange={capturarDatos}
                              />
                              <p>OU</p>
                          </label>
                            <label className={style.inputCheckOU}>
                              <input
                                type="checkbox"
                                name='dosPor'
                                checked={formulario.dosPor}
                                onChange={capturarDatos}
                              />
                              <p>2x</p>
                          </label>
                          </>
                        )}


                    
                    <br />
                    <p className={style.tituloInput}>URL Contador</p>
                    <input 
                        type="text"
                        name='url'
                        placeholder='URL'
                        value={formulario.url}
                        onChange={capturarDatos}
                        // required
                    />

                    {!editandoId && (
                      <button className={style.inputButton} type="submit">
                        Agregar cupón +
                      </button>
                    )}

                    {editandoId && (
                      <button
                        className={style.inputButton}
                        type="button"
                        onClick={guardarEdicion}
                      >
                        Editar cupón
                      </button>
                    )}

                    <p className={style.tituloInput}>Carga un archivo de contadores</p>
                    <input type="file" accept=".html" onChange={handleUploadHTML} />
                </form>
                    
            </div>
            <button className={style.btnDescargar} onClick={descargarHTML}>Descargar cupones</button>
        </div>
  )
}

export default FormularioContadores
