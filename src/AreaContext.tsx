import { ReactNode, createContext, useState } from "react" 

export type IArea = { name: string,  start: [number, number],  end: [number, number] } 
export type IPreset = { areas?: IArea[],  name: string } 

export interface IAreaContext {
     
  isChanged: boolean 
  setIsChanged: (state: boolean) => void 
  isAddedArea: boolean 
  setIsAddedArea: (state: boolean) => void 
  isCreated: boolean 
  setIsCreated: (state: boolean) => void 
  currentPresetId: number 
  setCurrentPresetId: (state: number) => void 
  active: boolean 
  setActive: (state: boolean) => void 
  listArea: IArea[] 
  setListArea: (state: IArea[]) => void 
  startArea: boolean 
  setStartArea: (state: boolean) => void 
  activeSave: boolean 
  setActiveSave: (state: boolean) => void 
  xyStart: [number, number] 
  setxyStart: (state: [number, number]) => void 
  xyEnd: [number, number] 
  setxyEnd: (state: [number, number]) => void 
  deleteArea: (id: number) => void 
  listPreset: IPreset[] 
  setListPreset: React.Dispatch<React.SetStateAction<IPreset[]>> 
  activeSavePreset: boolean 
  setActiveSavePreset: (state: boolean) => void 
  deletePreset: (id: number) => void 
  changePreset: (id: number) => void 
}

export const AreaContext = createContext<IAreaContext>({
  isChanged: false,
  setIsChanged: () => {},
  isAddedArea: false,
  setIsAddedArea: () => {},
  isCreated: false,
  setIsCreated: () => {},
  setCurrentPresetId: () => {},
  currentPresetId: -1,
  active: false,
  setActive: () => {},
  listArea: [],
  setListArea: () => {},
  startArea: false,
  setStartArea: () => {},
  activeSave: false,
  setActiveSave: () => {},
  xyStart: [0, 0],
  setxyStart: () => {},
  xyEnd: [0, 0],
  setxyEnd: () => {},
  deleteArea: () => {},
  listPreset: [],
  setListPreset: () => {},
  activeSavePreset: false,
  setActiveSavePreset: () => {},
  deletePreset: () => {},
  changePreset: () => {},
}) 

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [active, setActive] = useState<boolean>(false) 
  const [listArea, setListArea] = useState<IArea[]>([]) 
  const [startArea, setStartArea] = useState<boolean>(false) 
  const [activeSave, setActiveSave] = useState<boolean>(false) 
  const [xyStart, setxyStart] = useState<[number, number]>([0, 0]) 
  const [xyEnd, setxyEnd] = useState<[number, number]>([1, 1]) 
  const [listPreset, setListPreset] = useState<IPreset[]>([]) 
  const [activeSavePreset, setActiveSavePreset] = useState<boolean>(false) 
  const [currentPresetId, setCurrentPresetId] = useState<number>(-1) 
  const [isAddedArea, setIsAddedArea] = useState<boolean>(false) 
  const [isCreated, setIsCreated] = useState<boolean>(false) 
  const [isChanged, setIsChanged] = useState<boolean>(false) 

  const deleteArea = (id: number) => {
    setListArea(listArea.filter((item, _index) => _index != id)) 
  } 
  const deletePreset = (id: number) => {
    setListPreset(listPreset.filter((item, _index) => _index != id)) 
    setListArea([])
  } 
  const changePreset = (id: number) => {
    setListArea(listPreset.find((item, _index) => _index == id)?.areas || []) 
    setCurrentPresetId(id) 
    setIsAddedArea(true) 
    setIsCreated(false) 
    setIsChanged(false) 
  } 

  return (
    <AreaContext.Provider
      value={{
        isChanged,
        setIsChanged,
        isAddedArea,
        setIsAddedArea,
        isCreated,
        setIsCreated,
        setCurrentPresetId,
        currentPresetId,
        activeSavePreset,
        setActiveSavePreset,
        active,
        setActive,
        listArea,
        setListArea,
        startArea,
        setStartArea,
        activeSave,
        setActiveSave,
        xyStart,
        setxyStart,
        xyEnd,
        setxyEnd,
        deleteArea,
        listPreset,
        setListPreset,
        deletePreset,
        changePreset,
      }}
    >
      {children}
    </AreaContext.Provider>
  ) 
} 
