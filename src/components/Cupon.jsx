import React, { useContext } from 'react'
import style from '../styles/cupon.module.css'
import image from '../assets/profile-img.jpg'
import { CuponContext } from '../context/CuponContext'

const Cupon = () => {

  const{formulario, datos} = useContext(CuponContext)

  return (
    <div>
    {
      datos.map ((datos)=>(
        
      <div key={datos.id} className={style.contenedor}>
        <img className={style.img} src={image} alt="" />
        <div className={style.info}>

          <div className={style.contendorCupon}>
            <p className={style.texto}>usando el cupon</p>
            <p className={style.cupon}>{datos.cupon}</p>
          </div>

          <div className={style.contendorllamado}>
            <div className={style.contenedorDcto}>
              <p className={style.porcentaje}>{datos.dcto}</p>
              <div className={style.innerContenedor}>
                <p className={style.textPorcentaje}>% dcto</p>
                <p className={style.adicional}>adicional</p> 
              </div>
            </div>
            <p className={style.llamado}>{datos.llamado}</p>
            <p className={style.pSeleccionados}>Productos seleccionados</p>
          </div>
          
          <p className={style.verProductos}>Ver productos </p>
        </div>

        <div className={style.divisor}></div>
        <div className={style.contenedorLegal}>
          <p className={style.textoLegal}>Válido hasta el {datos.fecha} a las 23:59 hras</p>
        </div>
      
      </div>

      ))
    }



{/* <div className={style.contenedor}>
        <img className={style.img} src={image} alt="" />
        <div className={style.info}>

          <div className={style.contendorCupon}>
            <p className={style.texto}>usando el cupon</p>
            <p className={style.cupon}>samsung50</p>
          </div>

          <div className={style.contendorllamado}>
            <div className={style.contenedorDcto}>
              <p className={style.porcentaje}>50</p>
              <div className={style.innerContenedor}>
                <p className={style.textPorcentaje}>% dcto</p>
                <p className={style.adicional}>adicional</p> 
              </div>
            </div>
            <p className={style.llamado}>En celulares samsumg</p>
            <p className={style.pSeleccionados}>Productos seleccionados</p>
          </div>
          
          <p className={style.verProductos}>Ver productos </p>
        </div>

        <div className={style.divisor}></div>
        <div className={style.contenedorLegal}>
          <p className={style.textoLegal}>Válido hasta el 04/06/2025 a las 23:59 hras</p>
        </div>
      
      </div> */}


    </div>
    
  )
}

export default Cupon
