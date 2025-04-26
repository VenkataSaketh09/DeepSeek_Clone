'use client'
import { useUser } from "@clerk/nextjs"
import { createContext,useContext } from "react"

export const AppContext = createContext({} as any);

export const useAppContext=()=>{
    return useContext(AppContext);
}

export const AppContextProvider=({children}:{children:React.ReactNode})=>{
    const user=useUser();
    return <AppContext.Provider value={{user}}>{children}</AppContext.Provider>
}
