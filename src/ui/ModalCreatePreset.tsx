import { useContext, useRef, useState } from "react" 
import { AreaContext } from "../AreaContext" 
import classNames from "classnames" 
import { styleButton, styleInput, styleModal } from "./Style"

const ModalCreatePreset = () => {
  const {
    setActive,
    setIsCreated,
    setCurrentPresetId,
    activeSavePreset,
    setActiveSavePreset,
    setListArea,
    listPreset,
    setListPreset,
  } = useContext(AreaContext) 
  const namePreset = useRef<any>(null) 
  const [Err, setErr] = useState<boolean>(false) 

  const createPreset = () => {
    if (namePreset.current.value == "") {
      setErr(true) 
    } else {
      setListPreset((prev) => [...prev, { name:namePreset.current.value }]) 
      setActiveSavePreset(false) 
      setListArea([]) 
      setCurrentPresetId(listPreset.length) 
      setIsCreated(true) 
      setActive(true)
    }
  } 
  const cancleSavePreset = () => {
    setActiveSavePreset(false) 
    namePreset.current.value = "" 
    setActive(true)
  } 

  return (
    <>
      {activeSavePreset && <div
        className={classNames("absolute w-full h-full bg-slate-700/50")}
      >
        <div className={styleModal}>
          <div className="flex flex-col">
            <input className={styleInput} ref={namePreset} placeholder="Имя пресета" type="text" />
            {Err && <div className="text-center text-red-500">Введите имя Пресета</div>}
            <div className="flex justify-around">
              <button className={classNames("w-[50%] m-2 p-2 h-[40px]" + styleButton)} onClick={createPreset}>
                Создать
              </button>
              <button className={classNames("w-[50%] m-2 p-2 h-[40px]" + styleButton)} onClick={cancleSavePreset}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  ) 
} 

export default ModalCreatePreset 
