import classNames from "classnames" 
import { useContext, useRef, useState } from "react" 
import { AreaContext } from "../AreaContext" 
import { styleButton, styleInput, styleModal } from "./Style" 

interface IModalSave extends React.HTMLAttributes<HTMLElement> {}

const ModalSave = ({}: IModalSave) => {
  const {
    listArea,
    setActive,
    setListArea,
    activeSave,
    setActiveSave,
    xyStart,
    xyEnd,
  } = useContext(AreaContext)

  const [Err, setErr] = useState<boolean>(false) 
  const nameArea = useRef<any>(null)

  const saveArea = () => {
    if (nameArea.current.value == "") {
      setErr(true) 
    } else {
      setListArea([...listArea, { name: nameArea.current.value, start: xyStart, end: xyEnd }]) 
      setActiveSave(false) 
      nameArea.current.value = "" 
      setActive(true)
    }

  } 
  const cancleSaveArea = () => {
    setActiveSave(false) 
    nameArea.current.value = "" 
    setActive(true)
  } 

  return (
    <>
      <div
        className={
          activeSave ? classNames("absolute w-full h-full bg-slate-700/50") : classNames("hidden")
        }
      >
        <div className = {styleModal}>
          <div className="flex flex-col">
            <input className={styleInput} ref={nameArea} placeholder="Имя области" type="text" />
            {Err && <div className="text-center text-red-500">Введите имя области</div>}
            <div className="flex justify-around">
              <button className={classNames("w-[50%] m-2 p-2 h-[40px]" + styleButton)} onClick={saveArea}>
                Сохранить
              </button>
              <button className={classNames("w-[50%] m-2 p-2 h-[40px]" + styleButton)} onClick={cancleSaveArea}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
} 

export default ModalSave 
