import { useState, createContext } from "react";

export const FalabellaContext = createContext()

const FalabellaProvider = ({children}) => {
    
    const [image, setImage] = useState("");



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

    return(
        <FalabellaContext.Provider value={{image, getInformacion}}>
            {children}
        </FalabellaContext.Provider>
    )
}

export default FalabellaProvider