import { createContext } from "react";
import { useState } from "react";

export const cartContext = createContext({})

export const CartcontextProvider = ({children})=>{
    const [cartTotal, setCartTotal] = useState({})
    return(
        <cartContext.Provider value={{cartTotal,setCartTotal}}>
            {children}
        </cartContext.Provider>
        
    )
}