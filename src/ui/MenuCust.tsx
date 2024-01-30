import classNames from "classnames";
import { useState, createContext, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useOutsideClick from "../hooks/useClickOutside";
import { MyContext } from "../Context";

interface IMenuCust extends React.HTMLAttributes<HTMLElement> {
  topButton?: string
  topMenu?: string
  setStartArea: (state: boolean) => void
  fCol: number
  fRow: number
  setFCol: (state: number) => void
  setFRow: (state: number) => void
}

const MenuCust = ({ children, topButton, topMenu, setStartArea, fCol, fRow, setFCol, setFRow }: IMenuCust) => {
  const [mouseIn, setMouseIn] = useState<boolean>(false)
  const [formatMenu, setFormatMenu] = useState<boolean>(false)

  const { active, setActive } = useContext(MyContext)

  const showMenu = () => { setActive(true) }
  const hideMenu = () => { setActive(false) }

  const showFormatMenu = () => { setFormatMenu(true) }
  const hideFormatMenu = () => { setFormatMenu(false) }

  const handleChangeCol = (event: any) => {
    setFCol(event.target.value)
  }
  const handleChangeRow = (event: any) => {
    setFRow(event.target.value)
  }

  const showCut = () => { setMouseIn(true) }
  const hideCut = () => { setMouseIn(false) }

  const start = () => {
    setActive(false)
    setStartArea(true)
  }

  const styleMenuButton = classNames(topButton, 'absolute bg-slate-700 top-[47%] text-slate-400 flex justify-center items-center rounded-l-md w-[30px] h-[60px] hover:bg-slate-600 transition-all active:bg-slate-500',
    {
      "right-[399px]": active,
      "right-[10px]": !active
    },
    {
      "right-[10px]": !mouseIn,
      "right-[29px] bg-slate-600": mouseIn
    })
  const styleMenu = classNames(topMenu, 'absolute right-0 bg-slate-700 text-slate-400 h-full w-[400px] flex flex-col before:scale-0 after:scale-100 transition-all')
  const styleMenuCut = classNames("bg-slate-700 absolute h-full top-0 right-0 w-[30px] transition-all",
    {
      "translate-x-[20px] ": !mouseIn,
      "translate-x-[0px] bg-slate-600": mouseIn
    })
  const styleDivFormat = classNames('border-2 border-slate-400 transition-all flex flex-col justify-center text-center absolute top-[12%] w-full',
    {
      'right-[-100%]': !formatMenu,
      'right-0': formatMenu
    }
  )
  const styleInput = classNames('m-2 h-[40px] bg-slate-800 outline-none p-2')
  const styleButton = classNames(' p-2 hover:bg-slate-600 transition-all active:bg-slate-500 border-b-2 border-slate-600')

  return (
    <>
      <div onMouseEnter={e => showCut()} onMouseLeave={e => hideCut()} onClick={!active ? showMenu : hideMenu} className={styleMenuCut}></div>
      <button onMouseEnter={e => showCut()} onMouseLeave={e => hideCut()} onClick={!active ? showMenu : hideMenu} className={styleMenuButton}><FaChevronLeft className={classNames({ "rotate-180": active })} /></button>
      <div className={!active ? classNames(styleMenu, "translate-x-[100%]") : classNames(styleMenu, "translate-x-[0%]")}>
        <button className={styleButton}>Редактировать область</button>
        <button onClick={e => start()} className={styleButton}>Добавить область</button>
        <button onClick={!formatMenu ? showFormatMenu : hideFormatMenu} className={styleButton}>Задать минимальный формат</button>
        <div className={styleDivFormat} ><p className='p-2'>Минимальный формат</p>
          <input className={styleInput} type="number" placeholder='Колонны' value={fCol} onChange={(event) => handleChangeCol(event)} />
          <input className={styleInput} type="number" placeholder='Строки' value={fRow} onChange={(event) => handleChangeRow(event)} />
          <button onClick={!formatMenu ? showFormatMenu : hideFormatMenu} className='bg-slate-800 p-2 m-2 hover:bg-slate-600 active:bg-slate-500'>Закрыть</button>
        </div>
      </div>
    </>
  );
}

export default MenuCust;