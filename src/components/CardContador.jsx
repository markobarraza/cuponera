import { useContext } from 'react'
import { ContadorContext } from '../context/ContadorContext'
import '../styles/CardContador.css'
import { NavLink } from 'react-router-dom'

const CardContador = ({contador}) => {
  const{eliminarContador, editarContador} = useContext(ContadorContext)

  return (
    <div data-swapy-slot={contador.id} data-contador="true" key={contador.id}>
            <div data-swapy-item={contador.id} className='Contador_contenedorPadre'>
                
                <NavLink to={contador.url} className="urlContador">
                  <div style={contador.precioCheck ?  undefined : {alignItems: 'center'} } className='Contador_contenedorCupon'>
      
                    {/* IMAGEN */}
                    <div className='Contador_contenedorImage'>
                      <img className='Contador_img' src={contador.image} alt= {`Contador Falabella ${contador.textoAlt}`} title={`Contador Falabella ${contador.textoAlt}`} />
                    </div>
      
                    {/* INFO */}
                    <div className='Contador_info'>
                      <div className='Contador_innerInfo'>
                        <div className='Contador_contendorCupon'>
                          <p className='Contador_texto'>{contador.marca}</p>
                          <p className='Contador_descripcion'>{contador.descripcion} </p>
                          <p className='Contador_subDescripcion'>{contador.subllamado}</p>
                        </div>
      
                        <div className='Contador_contendorllamado'>


                        {/* PRECIO OU */}
                        {contador.precioCheck && (
                          <div className="contenedorRelativoPrecio">
                            <div className="Contador_contenedorNumerosPrecio">
                              {contador.ou && (
                                <img className='imgOU_precio' src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt3a5f617676b151f4/OU-horizontal-2025.png" alt="" />
                              )}
                              <p className='Contador_precioOferta Contador_precioOU '>${contador.PrecioOferta}</p>
                              <p className='Contador_TextoprecioOferta'>
                                {contador.ou ? 
                                'Oportunidad única' : 'Todo medio de pago'
                                }
                                </p>
                              <p className='Contador_precioOferta'>${contador.PrecioTMP}</p>
                              <p className='Contador_TextoprecioOferta'>
                                {contador.ou ? 
                                `P. Normal:${contador.PrecioNormal}` : 'Precio normal'
                                }
                                
                                </p>
                            </div>
                          </div>
                        )}


                        {/* PRECIO UNICO */}
                        {contador.precioUnicoCheck && (
                          <div className="contenedorRelativoPrecio">
                            <div className="Contador_contenedorNumerosPrecio">
                                {contador.ouPrecioUnico && (
                                  <img className='imgOU_precio' src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt3a5f617676b151f4/OU-horizontal-2025.png" alt="" />
                                )}
                              <div className='Contador_contenedor2xPrecio'>
                                {contador.dosPor && (
                                  <p className='Contador_texto2x'>2x</p>
                                )}
                                <p className='Contador_precio2x Contador_precioOU2x'>${contador.Precio2x}</p>
                              </div>
                              <p className='Contador_TextoprecioOferta'>Productos seleccionados</p>
                            </div>
                          </div>
                        )}


                          


                          {/* DESCUENTO */}
                          {contador.dctoCheck && (
                          <div>
                              <div className="contenedorRelativo">
                                <div className='fondoVerdeDCTO'></div>
                                <div className="Contador_contenedorNumeros">
                                  {contador.oudcto && (
                                    <img className='imgOU' src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt83e23fb7eb3e2175/OU-vertical-2025.png" alt="" />
                                  )}
                                  <p className='Contador_porcentaje'>{contador.dcto}</p>
                                  <div className='Contador_innerContenedor'>
                                    <p className='Contador_textPorcentaje'>%</p>
                                    <p className='Contador_adicional'>dcto</p> 
                                  </div>
                                </div>
                              </div>
                              <p className='Contador_pSeleccionados'>Productos seleccionados</p>
                          </div>
                          )}

                        </div>
                      </div>
                    </div>


                  </div>
                  </NavLink>
                
              
              {/* Editor de cupon */}
              <div className='Contador_editorCupon'>
                <p onClick={()=>editarContador(contador.id)} className='Contador_btnEditor'>
                  <i className="fa-solid fa-pen-to-square"></i>
                </p>
                <p onClick={()=>eliminarContador(contador.id)} className='Contador_btnEditor'>
                  <i className="fa-solid fa-trash-can"></i>
                </p>
              </div>
            </div>  
          </div>
  )
}

export default CardContador
