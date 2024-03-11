import classNames from "classnames";
import { useState, createContext, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useOutsideClick from "../hooks/useClickOutside";
import { AreaContext } from "../AreaContext";

interface IMenuCust extends React.HTMLAttributes<HTMLElement> {
  fCol: number;
  fRow: number;
  setFCol: (state: number) => void;
  setFRow: (state: number) => void;
  monitors: string;
  regions?: any;
  presets?: any;
}

const MenuCust = ({
  children,
  fCol,
  fRow,
  setFCol,
  setFRow,
  monitors,
  regions,
  presets,
}: IMenuCust) => {
  const [mouseIn, setMouseIn] = useState<boolean>(false)
  const {changePreset, active, setActive, startArea,setStartArea, listArea, setListArea, setxyStart, setxyEnd, deleteArea, listPreset, setListPreset, setActiveSavePreset, deletePreset} = useContext(AreaContext)

  const showMenu = () => {setActive(true)}
  const hideMenu = () => {setActive(false)}

  const handleChangeCol = (event: any) => {setFCol(event.target.value)}
  const handleChangeRow = (event: any) => {setFRow(event.target.value)}

  const showCut = () => {setMouseIn(true)}
  const hideCut = () => {setMouseIn(false)}

  const start = () => {
    setxyStart([0,0])
    setxyEnd([0,0])
    setActive(false)
    setStartArea(true)
  }

  const savePreset = () => {
    setActiveSavePreset(true)
    setActive(false)
  }

  const styleMenuButton = classNames(
    "absolute bg-slate-700 top-[47%] text-slate-400 flex justify-center items-center rounded-l-md w-[30px] h-[60px] hover:bg-slate-600 transition-all active:bg-slate-500",
    {
      "right-[399px]": active,
      "right-[10px]": !active,
    },
    {
      "right-[10px]": !mouseIn,
      "right-[29px] bg-slate-600": mouseIn,
    }
  );
  const styleMenu = classNames(
    "absolute right-0 bg-slate-700 text-slate-400 h-full w-[400px] flex flex-col before:scale-0 after:scale-100 transition-all"
  );
  const styleMenuCut = classNames(
    "bg-slate-700 absolute h-full top-0 right-0 w-[30px] transition-all",
    {
      "translate-x-[20px] ": !mouseIn,
      "translate-x-[0px] bg-slate-600": mouseIn,
    }
  );
  const styleDiv = classNames(
    "border-2 border-slate-500 transition-all flex flex-col justify-center text-center w-full"
  );
  const styleInput = classNames("m-2 h-[40px] bg-slate-800 outline-none p-2");
  const styleButton = classNames(
    " p-2 hover:bg-slate-600 transition-all active:bg-slate-500 bg-slate-800"
  );
  const styleText = classNames("p-2 border-b-2 border-slate-600");
  const styleList = classNames("list-none flex justify-around items-center border-2 border-slate-500")

  const opt = useOutsideClick(hideMenu)

  return (
    <>
    <div ref={opt}>
      <div
        onMouseEnter = {(e) => showCut()}
        onMouseLeave = {(e) => hideCut()}
        onClick = {!active ? showMenu : hideMenu}
        className = {styleMenuCut}
      ></div>
      <button
        onMouseEnter = {(e) => showCut()}
        onMouseLeave = {(e) => hideCut()}
        onClick = {!active ? showMenu : hideMenu}
        className = {styleMenuButton}
      >
        <FaChevronLeft className = {classNames({ "rotate-180": active })} />
      </button>
      <div
        className = {
          !active
            ? classNames(styleMenu, "translate-x-[100%]")
            : classNames(styleMenu, "translate-x-[0%]")
        }
      >
        <div className = {styleDiv}>
          <p className = {styleText}>Список мониторов</p>
          <ul>{monitors}</ul>
        </div>
        <div className = {styleDiv}>
          <p className = "p-2 border-b-2 border-slate-600">Задать минимальный формат</p>
          <input
            className = {styleInput}
            type = "number"
            placeholder = "Колонны"
            value = {fCol}
            onChange= { (event) => handleChangeCol(event)}
          />
          <input
            className = {styleInput}
            type = "number"
            placeholder = "Строки"
            value = {fRow}
            onChange = {(event) => handleChangeRow(event)}
          />
        </div>
        <div className = {styleDiv}>
          <p className = {styleText}>Список областей</p>
          <ul>{listArea.map((item, _index: number) => (<li className={styleList}>{_index + 1}. {item.name} : {`${item.start}x${item.end}`}<button onClick={()=>deleteArea(_index)} className={styleButton}>X</button></li>))}</ul>
          <button className = {styleButton} onClick={(e) => start()}>
            Добавить область
          </button>
        </div>
        <div className = {styleDiv}>
          <p className = {styleText}>Готовые пресеты областей</p>
          <ul>{listPreset.map((item, _index:number) => (<li className={styleList}>{_index + 1}. {item.name}<button onClick={() => changePreset(_index)} className={styleButton}>Y</button><button onClick={()=>deletePreset(_index)} className={styleButton}>X</button></li>))}</ul>
          <button onClick={savePreset} className = {styleButton}>Сохранить Пресет</button>
        </div>
      </div>
      </div>
    </>
  );
};

export default MenuCust;
