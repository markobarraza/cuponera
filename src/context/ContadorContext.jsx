import { createContext, useState, useContext, useRef } from "react";
import { FalabellaContext } from "./FalabellaContext";

export const ContadorContext = createContext()

const ContadorProvider = ({children})=>{

    const {image, getInformacion} = useContext(FalabellaContext)

    const [formulario, setFormulario] = useState(
        {
            sku: "",
            image: "",
            marca: "",
            descripcion: "",
            subllamado: "",
            PrecioOferta: "",
            PrecioTMP: "",
            PrecioNormal: "",
            dcto: "",
            Precio2x: "",
            url: "",
            ou: false,
            oudcto: false,
            ou2x: false,
            precioCheck: true,
            dctoCheck: false,
            precioUnicoCheck: false,
        }
    )

    const [datos, setDatos] = useState([]);
    const [editandoId, setEditandoId] = useState();


    ////////// Funcion que captura los datos escritos en los inputs //////////
    const capturarDatos = (e) => {
    const { name, type, value, checked } = e.target;
    setFormulario(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
    };


    // Boton agregar contador
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
        setFormulario({ 
            sku: "",
            image: "",
            marca: "",
            descripcion: "",
            subllamado: "",
            PrecioOferta: "",
            PrecioTMP: "",
            PrecioNormal: "",
            dcto: "",
            Precio2x: "",
            url: "",
            ou: false,
            oudcto: false,
            ouPrecioUnico: false,
            dosPor: false,
            precioCheck: true,
            dctoCheck: false,
            precioUnicoCheck: false,
        })
        
    }

    ////////// Funcion para editar un cupon ya creado //////////
    const editarContador = (id)=>{
        const cuponEditando = datos.find(c => c.id === id);
        if (cuponEditando){
            setFormulario({...cuponEditando});
            setEditandoId(id) //estado que guarda el ID seleccionado (asi se ocupa en formulario con un ternario cuando tiene informacion adentro)
        }
    }

    ////////// Funcion del boton para actualizar el array editado //////////
    const guardarEdicion = ()=>{
        setDatos(datos.map(contador =>
            contador.id === formulario.id ? {...formulario} : contador
        ));
        setFormulario({ 
            sku: "",
            image: "",
            marca: "",
            descripcion: "",
            subllamado: "",
            PrecioOferta: "",
            PrecioTMP: "",
            PrecioNormal: "",
            dcto: "",
            Precio2x: "",
            url: "",
            ou: false,
            oudcto: false,
            ouPrecioUnico: false,
            dosPor: false,
            precioCheck: true,
            dctoCheck: false,
            precioUnicoCheck: false,
        })

        setEditandoId(null)
    }    

    ////////// Funcion para eliminar un cupon //////////
    const eliminarContador = (id)=>{
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
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;

            const cards = tempDiv.querySelectorAll('[data-contador="true"]');

            // Helper para limpiar símbolos $
            const cleanMoney = (v) => (v || "").replace(/\$/g, "").trim();

            const contadores = Array.from(cards).map(div => {
                const image = div.querySelector('.Contador_img')?.getAttribute('src') || "";
                const marca = div.querySelector('.Contador_texto')?.textContent?.trim() || "";
                const descripcion = div.querySelector('.Contador_descripcion')?.textContent?.trim() || "";
                const subllamado = div.querySelector('.Contador_subDescripcion')?.textContent?.trim() || "";

                const bloquePrecio = div.querySelector('.contenedorRelativoPrecio');
                const bloqueDcto = div.querySelector('.contenedorRelativo');
                const bloque2x = bloquePrecio?.querySelector('.Contador_contenedor2xPrecio');

                const precioUnicoCheck = !!bloque2x;
                const precioCheck = !!bloquePrecio && !precioUnicoCheck;
                const dctoCheck = !!bloqueDcto;

                const ou = !!bloquePrecio?.querySelector('.imgOU_precio') && precioCheck;
                const ouPrecioUnico = !!bloquePrecio?.querySelector('.imgOU_precio') && precioUnicoCheck;
                const oudcto = !!bloqueDcto?.querySelector('.imgOU');

                let PrecioOferta = "";
                let PrecioTMP = "";
                let PrecioNormal = "";
                let Precio2x = "";
                let dcto = "";

                if (precioCheck) {
                    const precios = Array
                      .from(bloquePrecio.querySelectorAll('.Contador_precioOferta'))
                      .map(p => cleanMoney(p.textContent))
                      .filter(Boolean);

                    if (precios[0]) PrecioOferta = precios[0];
                    if (precios[1]) PrecioTMP = precios[1];

                    const normalLine = Array
                      .from(bloquePrecio.querySelectorAll('.Contador_TextoprecioOferta'))
                      .map(p => p.textContent)
                      .find(t => /P\.?\s*Normal/i.test(t));

                    if (normalLine){
                        const match = normalLine.match(/Normal:?[\s$]*([0-9.\-–_,]+)/i);
                        if (match) PrecioNormal = cleanMoney(match[1]);
                    }
                }

                if (precioUnicoCheck) {
                    Precio2x = cleanMoney(
                        bloque2x?.querySelector('.Contador_precio2x')?.textContent || ""
                    );
                }

                if (dctoCheck) {
                    dcto = bloqueDcto
                      ?.querySelector('.Contador_porcentaje')
                      ?.textContent
                      ?.replace(/[^0-9]/g,'')
                      ?.trim() || "";
                }

                const url = div.querySelector('.Contador_contendorllamado')?.getAttribute('href') || "";

                return {
                    id: Date.now() + Math.random(),
                    sku: "",
                    image,
                    marca,
                    descripcion,
                    subllamado,
                    PrecioOferta,
                    PrecioTMP,
                    PrecioNormal,
                    Precio2x,
                    dcto,
                    url,
                    ou,
                    oudcto,
                    ouPrecioUnico,
                    precioCheck,
                    dctoCheck,
                    precioUnicoCheck,
                };
            });

            setDatos(contadores);
            setEditandoId(null);
            setFormulario({
                sku: "",
                image: "",
                marca: "",
                descripcion: "",
                subllamado: "",
                PrecioOferta: "",
                PrecioTMP: "",
                PrecioNormal: "",
                dcto: "",
                Precio2x: "",
                url: "",
                ou: false,
                oudcto: false,
                ouPrecioUnico: false,
                precioCheck: true,
                dctoCheck: false,
                precioUnicoCheck: false,
            });
        };
        reader.readAsText(file);
    };
    
    
    return(
        <ContadorContext.Provider value={
            {
                capturarDatos,
                agregar,
                formulario,
                datos,
                editandoId,
                setFormulario,
                guardarEdicion,
                editarContador,
                eliminarContador,
                descargarHTML,
                grillaRef,
                handleUploadHTML,
                }
        }>
            {children}
        </ContadorContext.Provider>
    )
}

export default ContadorProvider