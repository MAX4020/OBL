import { useContext, useRef, useState } from "react";
import { AreaContext } from "../AreaContext";
import classNames from "classnames";

const ModalSavePreset = () => {
  const {setCurrentPresetId,currentPresetId,activeSavePreset,setActiveSavePreset,listArea,setListArea,listPreset,setListPreset} = useContext(AreaContext)
  const namePreset = useRef<any>(null)
  const [Err, setErr] = useState<boolean>(false)

  const savePreset = () => {
    if (namePreset.current.value == ""){
      setErr(true)
    }
    else{
      setListPreset(prev => [...prev, {name:namePreset.current.value}])
      setActiveSavePreset(false)
      namePreset.current.value = ""
      setListArea([])
      setCurrentPresetId(listPreset.length)
    }
  }
  const cancleSavePreset = () => {
    setActiveSavePreset(false)
    namePreset.current.value = ""
  }

  const styleButton = classNames(
    "w-[50%] p-2 hover:bg-slate-600 transition-all active:bg-slate-500 bg-slate-800 m-2"
  );
  const styleInput = classNames("m-2 h-[40px] bg-slate-800 outline-none p-2");

  return ( 
    <div className={activeSavePreset? classNames("absolute w-full h-full bg-slate-700/50"): classNames("hidden")}>
    <div className="absolute w-[25%]  top-[45%] left-[37%] bg-slate-700 text-slate-400 shadow-[]">
      <div className="flex flex-col">
        <input className={styleInput} ref={namePreset} placeholder="Имя пресета" type="text" />
        {Err && <div className="text-center text-red-500">Введите имя Пресета</div>}
        <div className="flex justify-around">
          <button className={styleButton} onClick={savePreset}>Сохранить</button>
          <button className={styleButton} onClick={cancleSavePreset}>Отмена</button>
        </div>
      </div>
    </div>
  </div>
   );
}
 
export default ModalSavePreset;