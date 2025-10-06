import { useContext, useState } from 'react'
import { CuponContext } from '../context/CuponContext'
import { NavLink } from 'react-router-dom'
import '../styles/cupon.css'

const Cupon = ({cupon}) => {

  const{editarCupon, eliminarCupon} = useContext(CuponContext)
  const [verLegal, setVerLegal] = useState(false)


  return (
    <>      
      <div data-swapy-slot={cupon.id} data-cupon="true" key={cupon.id}>
        <div data-swapy-item={cupon.id} className='Cupon_contenedorPadre'>
            <div className='Cupon_contenedorCupon'>


              {/* IMAGEN */}
              <div className='Cupon_contenedorImage'>
                <img className='Cupon_img' src={cupon.image} alt= {`Cupón Falabella ${cupon.textoAlt}`} title={`Cupón Falabella ${cupon.textoAlt}`} />
              </div>

              {/* DIVISOR */}
              <div className='Cupon_divisor'></div>

              {/* INFO */}
              <div className='Cupon_info'>
                <div className='Cupon_innerInfo'>
                  <div className='Cupon_contendorCupon'>
                    <p className='Cupon_texto'>usando el cupon</p>
                    <div className='Cupon_nombreCupon'>
                      <p className='Cupon_cupon'>{cupon.cupon}</p>
                      <img className='Cupon_iconCopiar copiarCupon' src="https://images.contentstack.io/v3/assets/blt7c5c2f2f888a7cc3/blt6d1556bf501d9da7/copy-regular-full.png" alt="Tarjeta Oportunidad unica falabella" />
                      <div className="Cupon_mensajeCopiado">Copiar cupon</div>
                    </div>
                  </div>

                  <NavLink to={cupon.url} className='Cupon_contendorllamado'>
                  
                    <div className='Cupon_contenedorDcto'>
                      <p className='Cupon_porcentaje'>{cupon.dcto}</p>
                      <div className='Cupon_innerContenedor'>
                        <p className='Cupon_textPorcentaje'>% dcto</p>
                        <p className='Cupon_adicional'>adicional</p> 
                      </div>
                    </div>
                    <p className='Cupon_llamado' data-field="llamado" >{cupon.llamado}</p>
                    <p className='Cupon_subllamado'>{cupon.subllamado}</p>
                    <p className='Cupon_pSeleccionados'>Productos seleccionados</p>
                    <p className='Cupon_verProductos'>Ver productos </p>
                  
                  </NavLink>
                  
                </div>

                {/* <div className='Cupon_contenedorLegal'>
                  <p className='Cupon_textoLegal'>Válido hasta el {cupon.dia}/{cupon.mes}/2025 a las {cupon.hora}hras. </p>
                </div> */}

              </div>
              
            </div>
            
            <div className="Cupon_contenedorTC">
              <div className='Cupon_VerTC' onClick={()=>setVerLegal(v=>!v)}>
                  Ver términos y condiciones
              </div>
              <div className={`panel ${verLegal ? 'panel--open' : ''}`}>{cupon.legal}</div>
            </div>
          
          {/* Editor de cupon */}
          <div className='Cupon_editorCupon'>
            <p onClick={()=>editarCupon(cupon.id)} className='Cupon_btnEditor'>
              <i className="fa-solid fa-pen-to-square"></i>
            </p>
            <p onClick={()=>eliminarCupon(cupon.id)} className='Cupon_btnEditor'>
              <i className="fa-solid fa-trash-can"></i>
            </p>
          </div>
        </div>  
      </div>

      

      
    
    





    
    </>
  )
}

export default Cupon
