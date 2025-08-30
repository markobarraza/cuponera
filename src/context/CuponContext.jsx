import { createContext, useState } from "react";

export const CuponContext = createContext()

const CuponProvider = ({children})=>{

    const [formulario, setFormulario] = useState(
            {
                cupon: "",
                dcto: "",
                llamado: "" 
            }
        )
    
        const [datos, setDatos] = useState([])
    
        const capturarDatos = (e)=>{
            setFormulario({
                ...formulario,
                [e.target.name]:e.target.value
                }
            )
        }
    
    
        const agregar=()=>{
            setDatos ([...datos, formulario])
            setFormulario({ cupon: "", dcto: "", llamado: "" })
        }

    return(
        <CuponContext.Provider value={{capturarDatos, formulario, agregar, datos}}>
            {children}
        </CuponContext.Provider>
    )
}

export default CuponProvider