import classNames from "classnames";
import { useState, useContext, useEffect, useRef } from "react";
import { FaAlignJustify, FaChevronLeft, FaDeleteLeft } from "react-icons/fa6";
import useOutsideClick from "../hooks/useClickOutside";
import { AreaContext, IArea } from "../AreaContext";
import { styleButton, styleDiv, styleIcon, styleInput, styleList, styleMenu, styleText } from "./Style";

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
  fCol,
  fRow,
  setFCol,
  setFRow,
  monitors,
}: IMenuCust) => {
  const {
    isChanged,
    setIsChanged,
    isAddedArea,
    setIsAddedArea,
    isCreated,
    setIsCreated,
    currentPresetId,
    changePreset,
    active,
    setActive,
    setStartArea,
    listArea,
    setListArea,
    setxyStart,
    setxyEnd,
    deleteArea,
    listPreset,
    setListPreset,
    setActiveSavePreset,
    deletePreset,
  } = useContext(AreaContext);
  const [mouseIn, setMouseIn] = useState<boolean>(false)
  const savedListArea = useRef<IArea[]>([])

  const showMenu = () => setActive(true)
  const hideMenu = () => setActive(false)

  const handleChangeCol = (event: any) => setFCol(event.target.value)
  const handleChangeRow = (event: any) => setFRow(event.target.value)

  const showCut = () => setMouseIn(true)
  const hideCut = () => setMouseIn(false)

  const outMenu = () => {
    if(active){
      setTimeout(() => setActive(false), 150)
    }
  }

  const start = () => {
    setxyStart([0, 0])
    setxyEnd([0, 0])
    setActive(false)
    setStartArea(true)
  }

  const createPreset = () => {
    setActiveSavePreset(true)
    setActive(false)
    setIsAddedArea(false)
  }

  const savePreset = () => {
    setIsChanged(false)
    setIsAddedArea(true)
    setIsCreated(false)
    setListPreset((prev) =>
      prev.map((value, idx) => (idx === currentPresetId ? { ...value, areas: listArea } : value))
    )
  }

  const reductPreset = () => {
    setIsChanged(true)
    setIsCreated(true)
    setIsAddedArea(false)
  };

  const opt = useOutsideClick(outMenu);

  useEffect(() => {
    savedListArea.current = [...listArea];
  }, [currentPresetId]);

  useEffect(() => {
    if (JSON.stringify(listArea) != JSON.stringify(savedListArea.current)) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [listArea.length]);

  const styleMenuButton = classNames(
    "absolute bg-slate-700 top-[47%] text-slate-400 flex justify-center items-center rounded-l-md w-[40px] h-[80px] hover:bg-slate-600 transition-all active:bg-slate-500",
    {
      "right-[399px]": active,
      "right-[10px]": !active,
    },
    {
      "right-[10px]": !mouseIn,
      "right-[29px] bg-slate-600": mouseIn,
    })
  const styleMenuCut = classNames(
    "bg-slate-700 absolute h-full top-0 right-0 w-[30px] transition-all",
    {
      "translate-x-[20px] ": !mouseIn,
      "translate-x-[0px] bg-slate-600": mouseIn,
    })

  return (
    <>
      <div ref={opt}>
        <div
          onMouseEnter={(e) => showCut()}
          onMouseLeave={(e) => hideCut()}
          onClick={!active ? showMenu : hideMenu}
          className={styleMenuCut}
        ></div>
        <button
          onMouseEnter={(e) => showCut()}
          onMouseLeave={(e) => hideCut()}
          onClick={!active ? showMenu : hideMenu}
          className={styleMenuButton}
        >
          <FaChevronLeft className={classNames({ "rotate-180": active })} />
        </button>
        <div
          className={
            !active
              ? classNames(styleMenu, "translate-x-[100%]")
              : classNames(styleMenu, "translate-x-[0%]")
          }
        >
          <div className={styleDiv}>
            <p className={styleText}>Список мониторов</p>
            <ul>{monitors}</ul>
          </div>
          <div className={styleDiv}>
            <p className="p-2 border-b-2 border-slate-600">Задать минимальный формат</p>
            <input
              className={styleInput}
              type="number"
              placeholder="Колонны"
              value={fCol}
              onChange={(event) => handleChangeCol(event)}
            />
            <input
              className={styleInput}
              type="number"
              placeholder="Строки"
              value={fRow}
              onChange={(event) => handleChangeRow(event)}
            />
          </div>
          {isCreated &&
           listPreset.length != 0 &&
          (
            <div className={styleDiv}>
              <p className={styleText}>Список областей</p>
              <ul>
                {listArea.map((item, _index: number) => (
                  <li className={styleList}>
                    <div className="w-[50%]">
                      {_index + 1}. {item.name} : {`${item.start}x${item.end}`}
                      </div>
                    <div className="w-[50%]">
                      <button onClick={() => deleteArea(_index)} className={classNames("" + styleIcon)}>
                        <FaDeleteLeft/>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button className={styleButton} onClick={(e) => start()}>
                Добавить область
              </button>
            </div>
          )}
          <div className={styleDiv}>
            <p className={styleText}>Готовые пресеты областей</p>
            <ul>
              {listPreset.map((item, _index: number) => (
                <li className={styleList}>
                  <div className="w-[50%]">
                    {_index + 1}. {item.name}
                  </div>
                  <div className="w-[50%] flex">
                    <button onClick={() => changePreset(_index)} className={styleIcon}>
                      <FaAlignJustify/>
                    </button>
                    <button onClick={() => deletePreset(_index)} className={styleIcon}>
                      <FaDeleteLeft/>
                    </button>
                  </div>
                  
                </li>
              ))}
            </ul>
            <button onClick={createPreset} className={styleButton}>
              Создать Пресет
            </button>
            {isChanged && 
            listPreset.length != 0 && 
            (
              <button onClick={savePreset} className={styleButton}>
                Сохранить Пресет
              </button>
            )}
            {isAddedArea && 
            listPreset.length !=0 &&
            (
              <button onClick={reductPreset} className={styleButton}>
                Редактировать Пресет
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCust;
