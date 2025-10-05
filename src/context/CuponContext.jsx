import { useRef, createContext, useState, useContext } from "react";
import { FalabellaContext } from "./FalabellaContext";


export const CuponContext = createContext()

const CuponProvider = ({children})=>{

    const {image, textoAlt, getInformacion} = useContext(FalabellaContext)
    

    // Estado que guarda la info que se escribe en los input
    const [formulario, setFormulario] = useState(
            {
                sku: "",
                image: "",
                cupon: "",
                dcto: "",
                llamado: "",
                subllamado: "",
                url: "",
                dia: "",
                mes: "",
                hora: "",
                legal: "",
                textoAlt: "",
            }
        )
    
    const [datos, setDatos] = useState([]);
    
    const [editandoId, setEditandoId] = useState();






    ////////// Funcion que captura los datos escritos en los inputs //////////
    const capturarDatos = (e)=>{
        // opciones para dcto y fecha
        if (e.target.name === "dcto" || e.target.name === "fecha" || e.target.name === "dia" || e.target.name === "mes") {
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
    
    ////////// Funcion que agrega la info del estado de formulario al 
    // de datos para crear el array de bjetos //////////
    const agregar= async()=>{
        let imageUrl = formulario.image; //se guarda en la variable lo que se escribe en input image
        let textoAltValue = "";

        if(!imageUrl && formulario.sku){ //la condicion es: si no hay info en input image y si hay info en input sku
            const { imageUrl: apiImage, textoalt } = await getInformacion(formulario.sku);
            // Si no hay URL manual, consulta la API por SKU
            imageUrl = apiImage; // espera y recibe la url
            textoAltValue = textoalt || textoAltValue; // usar API si no hay valor manual
        } 
        const nuevoCupon = {
            ...formulario,
            id: Date.now(), // ID único basado en la fecha y hora actual
            image: imageUrl || "", // usa la url recibida
            textoAlt: textoAltValue || "" // <-- AGREGAR al objeto
        };
        
        setDatos ([...datos, nuevoCupon])
        setFormulario({ 
            sku: "",
            image: "",
            cupon: "",
            dcto: "",
            subllamado: "",
            llamado: "",
            url: "",
            dia: "",
            mes: "",
            hora: "" ,
            legal: "",
            textoAlt: "" 
        })
        
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
        setFormulario({ 
            sku: "",
            image: "",
            cupon: "",
            dcto: "",
            subllamado: "",
            llamado: "",
            url: "",
            dia: "",
            mes: "",
            hora: "",
            legal: "",
            textoAlt: ""
        })

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
                const textoLegal = div.querySelector(".Cupon_textoLegal")?.textContent || "";
                // Captura dd/mm/(año ignorado) y hora hh:mm (si existe)
                // Ej: "Válido hasta el 05/10/2025 a las 23:59 hras."
                let dia = "", mes = "", hora = "";
                const m1 = textoLegal.match(/(\d{1,2})\/(\d{1,2})\/\d{4}/);
                if (m1){
                    dia = m1[1];
                    mes = m1[2];
                }
                const mHora = textoLegal.match(/(\d{1,2}:\d{2})/);
                if (mHora){
                    hora = mHora[1];
                }
                return {
                    image: div.querySelector("img")?.src || "",
                    cupon: div.querySelector(".Cupon_cupon")?.textContent || "",
                    dcto: div.querySelector(".Cupon_porcentaje")?.textContent || "",
                    llamado: div.querySelector(".Cupon_llamado")?.textContent || "",
                    subllamado: div.querySelector(".Cupon_subllamado")?.textContent || "",
                    legal: div.querySelector(".panel")?.textContent || "",
                    textoAlt: div.querySelector("img")?.getAttribute("alt") || "", 
                    dia,
                    mes,
                    hora,
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