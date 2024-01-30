import { FunctionComponent, HTMLAttributes, ReactNode, createContext, useState } from "react";

export interface IMyContext{
    active: boolean
    setActive: (state:boolean)=>void
}

export const MyContext = createContext<IMyContext>({
    active: false,
    setActive: ()=>{}
})

export const MyContextProvider = ({children}:{children:ReactNode}) =>{
    const [active,setActive] = useState<boolean>(false)

    return(
        <MyContext.Provider value={{active,setActive}}>
            {children}
        </MyContext.Provider>
    )
}