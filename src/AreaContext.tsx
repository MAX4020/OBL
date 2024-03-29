import { BlobOptions } from "buffer";
import { FunctionComponent, HTMLAttributes, ReactNode, createContext, useState } from "react";

export type IArea = {name:string, start:[number,number], end:[number,number]}
export type IPreset = {areas:IArea[], name:string}

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
    deleteArea: (id: number) => void
    listPreset: IPreset[]
    setListPreset: React.Dispatch<React.SetStateAction<IPreset[]>>
    activeSavePreset: boolean
    setActiveSavePreset: (state:boolean) => void
    deletePreset: (id: number) => void
    changePreset: (id:number) => void
}

export const AreaContext = createContext<IAreaContext>({
    active: false,
    setActive: ()=>{},
    listArea: [],
    setListArea: ()=>{},
    startArea: false,
    setStartArea: ()=>{},
    activeSave: false,
    setActiveSave: ()=>{},
    xyStart: [0,0],
    setxyStart: () => {},
    xyEnd: [0,0],
    setxyEnd: () => {},
    deleteArea: () => {},
    listPreset: [],
    setListPreset: () => {},
    activeSavePreset: false,
    setActiveSavePreset: () => {},
    deletePreset: () => {},
    changePreset: () => {}
})

export const MyContextProvider = ({children}:{children:ReactNode}) =>{
    const [active,setActive] = useState<boolean>(false)
    const [listArea, setListArea] = useState<IArea[]>([])
    const [startArea, setStartArea] = useState<boolean>(false)
    const [activeSave, setActiveSave] = useState<boolean>(false)
    const [xyStart, setxyStart] = useState<[number,number]>([0,0])
    const [xyEnd, setxyEnd] = useState<[number,number]>([1,1])
    const [listPreset, setListPreset] = useState<IPreset[]>([])
    const [activeSavePreset, setActiveSavePreset] = useState<boolean>(false)
    
    const deleteArea = (id:number) => {
        setListArea(listArea.filter((item, _index) => _index != id))
    }
    const deletePreset = (id:number) => {
        setListPreset(listPreset.filter((item, _index) => _index != id))
    }
    const changePreset = (id:number) => {
        setListArea(listPreset.find((item, _index) => _index == id)?.areas||[])
    }

    return(
        <AreaContext.Provider value={{activeSavePreset, setActiveSavePreset,active,setActive,listArea,setListArea,startArea,setStartArea,activeSave,setActiveSave,xyStart,setxyStart,xyEnd,setxyEnd, deleteArea, listPreset, setListPreset, deletePreset,changePreset}}>
            {children}
        </AreaContext.Provider>
    )
}