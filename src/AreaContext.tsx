import { BlobOptions } from "buffer";
import { FunctionComponent, HTMLAttributes, ReactNode, createContext, useState } from "react";

export type IArea = {name:string, start:[number,number], end:[number,number]}

export interface IAreaContext{
    active: boolean
    setActive: (state:boolean)=>void
    listArea: IArea[]
    setListArea: (state:IArea[])=>void
    startArea: boolean
    setStartArea: (state:boolean) => void
    activeSave: boolean
    setActiveSave: (state:boolean) => void
    xyStart: [number,number]
    setxyStart: (state:[number,number]) => void
    xyEnd: [number,number]
    setxyEnd: (state:[number,number]) => void
}

export const AreaContext = createContext<IAreaContext>({
    active: false,
    setActive: ()=>{},
    listArea: [],
    setListArea: ()=>{console.log("123")},
    startArea: false,
    setStartArea: ()=>{},
    activeSave: false,
    setActiveSave: ()=>{},
    xyStart: [0,0],
    setxyStart: () => {},
    xyEnd: [0,0],
    setxyEnd: () => {}
})

export const MyContextProvider = ({children}:{children:ReactNode}) =>{
    const [active,setActive] = useState<boolean>(false)
    const [listArea, setListArea] = useState<IArea[]>([])
    const [startArea, setStartArea] = useState<boolean>(false)
    const [activeSave, setActiveSave] = useState<boolean>(false)
    const [xyStart, setxyStart] = useState<[number,number]>([0,0])
    const [xyEnd, setxyEnd] = useState<[number,number]>([1,1])

    return(
        <AreaContext.Provider value={{active,setActive,listArea,setListArea,startArea,setStartArea,activeSave,setActiveSave,xyStart,setxyStart,xyEnd,setxyEnd}}>
            {children}
        </AreaContext.Provider>
    )
}