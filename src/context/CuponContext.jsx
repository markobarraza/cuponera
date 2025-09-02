import { createContext, useState } from "react";

export const CuponContext = createContext()

const CuponProvider = ({children})=>{

    const [formulario, setFormulario] = useState(
            {
                sku: "",
                cupon: "",
                dcto: "",
                llamado: "",
                fecha: "",
                url: "",
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



    
        const capturarDatos = (e)=>{
            // opciones para dcto y fecha
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
    
    
        const agregar= async()=>{
            let imageUrl = formulario.image; //se guarda en la variable lo que se escribe en input image
            if(!imageUrl && formulario.sku){ //la condicion es: si no hay info en input image y si hay info en input sku
                // Si no hay URL manual, consulta la API por SKU
                imageUrl = await getInformacion(formulario.sku); // espera y recibe la url
            } 
            const nuevoCupon = {
                ...formulario,
                id: Date.now(), // ID único basado en la fecha y hora actual
                image: imageUrl || "" // usa la url recibida
            };
            
            setDatos ([...datos, nuevoCupon])
            setFormulario({ sku: "", image: "", cupon: "", dcto: "", llamado: "", fecha: "", url: "",})
            
        }

    return(
        <CuponContext.Provider value={{capturarDatos, formulario, agregar, datos, image}}>
            {children}
        </CuponContext.Provider>
    )
}

export default CuponProvider