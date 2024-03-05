import classNames from "classnames";
import { useContext, useRef, useState } from "react";
import { AreaContext } from "../AreaContext";

interface IModalSave extends React.HTMLAttributes<HTMLElement> {
}

const ModalSave = ({}:IModalSave) => {
  const {listArea, setListArea,activeSave,setActiveSave, xyStart, setxyStart, xyEnd, setxyEnd} = useContext(AreaContext)
  const [Err, setErr] = useState<boolean>(false)
  const nameArea = useRef<any>(null)

  const saveArea = () => {
    if (nameArea.current.value == ""){
      setErr(true)
    }
    else{
    setListArea([...listArea, {name:nameArea.current.value, start:xyStart, end:xyEnd}])
    setActiveSave(false)
    nameArea.current.value = ""
    }
  }
  const cancleSaveArea = () => {
    setActiveSave(false)
    nameArea.current.value = ""
  }

  const styleButton = classNames(
    "w-[50%] p-2 hover:bg-slate-600 transition-all active:bg-slate-500 bg-slate-800 m-2"
  );
  const styleInput = classNames("m-2 h-[40px] bg-slate-800 outline-none p-2");
  return ( 
    <>
          <div className={activeSave? classNames("absolute w-full h-full bg-slate-700/50"): classNames("hidden")}>
            <div className="absolute w-[25%]  top-[45%] left-[37%] bg-slate-700 text-slate-400 shadow-[]">
              <div className="flex flex-col">
                <input className={styleInput} ref={nameArea} placeholder="Имя области" type="text" />
                {Err && <div className="text-center text-red-500">Введите имя области</div>}
                <div className="flex justify-around">
                  <button className={styleButton} onClick={saveArea}>Сохранить</button>
                  <button className={styleButton} onClick={cancleSaveArea}>Отмена</button>
                </div>
              </div>
            </div>
          </div>
    </>
   );

}
 
export default ModalSave;