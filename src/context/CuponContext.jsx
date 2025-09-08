import { useRef, createContext, useState } from "react";

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
    
    const [datos, setDatos] = useState([]);
    const [image, setImage] = useState("");
    const [editandoId, setEditandoId] = useState();


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
            setEditandoId(id) //estado que guarda el ID seleccionado (asi se ocupa en formulario con un ternario cuando tiene informacion adentro)
        }
    }

    ////////// Funcion del boton para actualizar el array editado //////////
    const guardarEdicion = ()=>{
        setDatos(datos.map(cupon =>
            cupon.id === formulario.id ? {...formulario} : cupon
        ));
        setFormulario({ sku: "", image: "", cupon: "", dcto: "", llamado: "", fecha: "", url: "", dia: "", mes: "", anio: "" })
        setEditandoId(null)
    }    

    ////////// Funcion para eliminar un cupon //////////
    const eliminarCupon = (id)=>{
        setDatos(datos.filter(c => c.id !== id))
        // if(cuponEliminado){
        //     setDatos([cuponEliminado])
        // }
    }



    ////////// Funcion para descargar HTML de la grilla //////////
    const grillaRef = useRef();

    const descargarHTML = () => {
        const html = grillaRef.current.innerHTML;
        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "grilla-cupones.html";
        a.click();
        URL.revokeObjectURL(url);
    };



    const handleUploadHTML = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const html = event.target.result;
            // Crea un DOM temporal para parsear el HTML
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            // Extrae los datos de los cupones (ajusta el selector según tu grilla)
            const cuponesDivs = tempDiv.querySelectorAll('[data-cupon="true"]');

            const cupones = Array.from(cuponesDivs).map(div => {
                return {
                    image: div.querySelector("img")?.src || "",
                    cupon: div.querySelector("._cupon_1ukwe_39")?.textContent || "",
                    dcto: div.querySelector("._porcentaje_1ukwe_58")?.textContent || "",
                    llamado: div.querySelector("._llamado_1ukwe_78")?.textContent || "",
                    fecha: div.querySelector("._textoLegal_1ukwe_122")?.textContent?.match(/\d{2}\/\d{2}\/\d{4}/)?.[0] || "",
                    url: "", // Si tienes un campo url, ajusta aquí el selector
                    id: Date.now() + Math.random()
                };
            });

            setDatos(cupones);
        };
        reader.readAsText(file);
    };

    return(
        <CuponContext.Provider value={
            {
                capturarDatos,
                formulario, 
                agregar, 
                datos, 
                image, 
                editarCupon, 
                eliminarCupon, 
                editandoId, 
                guardarEdicion,
                grillaRef,
                descargarHTML,
                handleUploadHTML
            }
        }>
            {children}
        </CuponContext.Provider>
    )
}

export default CuponProvider