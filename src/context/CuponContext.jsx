import { createContext, useState } from "react";

export const CuponContext = createContext()

const CuponProvider = ({children})=>{

    // Estado que guarda la info que se escribe en los input
    const [formulario, setFormulario] = useState(
            {
                sku: "",
                cupon: "",
                dcto: "",
                llamado: "",
                fecha: "",
                url: "",
                dia: "",
                mes: "",
                anio: "",
            }
        )
    
    const [datos, setDatos] = useState([])
    const [image, setImage] = useState("")


    ////////// Consulta API falabella //////////
    const getInformacion = async (skuId) => {
        const jsonParam = JSON.stringify({
            products: [{ skuId }]
        });
    
        const encodedParam = encodeURIComponent(jsonParam);

        const url = `https://www.falabella.com/s/browse/v1/fetchItemDetails/cl?${encodedParam}`;

        try {
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            const imageUrl = data.products[0].product.mediaUrls[0];
            setImage(imageUrl);
            return imageUrl; // <-- retorna la url
        } catch (error) {
            console.error('Error al obtener datos:', error);
            return ""; // retorna vacío si hay error
        }
    };



    ////////// Funcion que captura los datos escritos en los inputs //////////
    const capturarDatos = (e)=>{
        // opciones para dcto y fecha
        if (e.target.name === "dcto" || e.target.name === "fecha" || e.target.name === "dia" || e.target.name === "mes" || e.target.name === "anio") {
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
    
    ////////// Funcion que agrega la info del estado de formulario al de datos para crear el array de bjetos //////////
    const agregar= async()=>{
        let imageUrl = formulario.image; //se guarda en la variable lo que se escribe en input image
        if(!imageUrl && formulario.sku){ //la condicion es: si no hay info en input image y si hay info en input sku
            // Si no hay URL manual, consulta la API por SKU
            imageUrl = await getInformacion(formulario.sku); // espera y recibe la url
        } 
        const fechaConcatenada = 
            formulario.dia && formulario.mes && formulario.anio ? `${formulario.dia}/${formulario.mes}/${formulario.anio}` : "";
        const nuevoCupon = {
            ...formulario,
            fecha: fechaConcatenada,
            id: Date.now(), // ID único basado en la fecha y hora actual
            image: imageUrl || "" // usa la url recibida
        };
        
        setDatos ([...datos, nuevoCupon])
        setFormulario({ sku: "", image: "", cupon: "", dcto: "", llamado: "", fecha: "", url: "", dia: "", mes: "", anio: "" })
        
    }

    ////////// Funcion para editar un cupon ya creado //////////
    const editarCupon = (id)=>{
        const cuponEditando = datos.find(c => c.id === id);
        if (cuponEditando){
            setFormulario({...cuponEditando});
        }
    }

    ////////// Funcion para eliminar un cupon //////////
    const eliminarCupon = (id)=>{
        setDatos(datos.filter(c => c.id !== id))
        // if(cuponEliminado){
        //     setDatos([cuponEliminado])
        // }
    }

    return(
        <CuponContext.Provider value={{capturarDatos, formulario, agregar, datos, image, editarCupon, eliminarCupon}}>
            {children}
        </CuponContext.Provider>
    )
}

export default CuponProvider