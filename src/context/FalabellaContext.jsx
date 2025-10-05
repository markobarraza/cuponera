import { useState, createContext } from "react";

export const FalabellaContext = createContext()

const FalabellaProvider = ({children}) => {
    
    const [image, setImage] = useState("");
    const[textoAlt, setTextoAlt] = useState("")



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
            const categoryPath = data.products[0].product.categoryPaths[0];

            // Extraer solo la primera categoría después de ||
            let textoalt = "";
            if (categoryPath && typeof categoryPath === 'string') {
                // Buscar patrón ||palabra/ y extraer solo "palabra"
                const match = categoryPath.match(/\|\|([^/]+)\//);
                if (match) {
                    textoalt = match[1]; // "Tecnología"
                }
            }


            setTextoAlt(textoalt)
            setImage(imageUrl);
            return { imageUrl, textoalt };
            // return imageUrl; 
        } catch (error) {
            console.error('Error al obtener datos:', error);
            return { imageUrl: "", textoalt: "" };
        }
    };

    return(
        <FalabellaContext.Provider value={{image, textoAlt, getInformacion}}>
            {children}
        </FalabellaContext.Provider>
    )
}

export default FalabellaProvider