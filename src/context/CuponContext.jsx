import { createContext, useState } from "react";

export const CuponContext = createContext()

const CuponProvider = ({children})=>{

    const [formulario, setFormulario] = useState(
            {
                cupon: "",
                dcto: "",
                llamado: "",
                fecha: "",
                url: "",
            }
        )
    
        const [datos, setDatos] = useState([])
    
        const capturarDatos = (e)=>{
            if (e.target.name === "dcto" || e.target.name === "fecha") {
                // Solo permitir números (y vacío para borrar)
                if (/^[\d/]*$/.test(e.target.value)) {
                    setFormulario({
                        ...formulario,
                        [e.target.name]: e.target.value
                    });
                }
            } else {
                setFormulario({
                    ...formulario,
                    [e.target.name]: e.target.value
                });
            }
        }
    
    
        const agregar=()=>{
            const nuevoCupon = {
                ...formulario,
                id: Date.now() // ID único basado en la fecha y hora actual
            };
            setDatos ([...datos, nuevoCupon])
            setFormulario({ cupon: "", dcto: "", llamado: "", fecha: "", url: "",})
        }

    return(
        <CuponContext.Provider value={{capturarDatos, formulario, agregar, datos}}>
            {children}
        </CuponContext.Provider>
    )
}

export default CuponProvider