import { useEffect, useRef, createContext, useContext } from "react"
import { createSwapy } from 'swapy'
import { CuponContext } from './CuponContext'

export const SwapyContext = createContext()

const SwapyProvider = ({children})=>{

    const swapy = useRef(null)
    const container = useRef(null)
    const {agregar} = useContext(CuponContext)


    useEffect(() => {
      // If container element is loaded
      if (container.current) {
        swapy.current = createSwapy(container.current)

        // Your event listeners
        swapy.current.onSwap((event) => {
          console.log('swap', event);
        })
      }

      return () => {
        // Destroy the swapy instance on component destroy
        swapy.current?.destroy()
      }
    }, [agregar])

    return(
        <SwapyContext.Provider value = {{container}}>
            {children}
        </SwapyContext.Provider>
    )

}

export default SwapyProvider