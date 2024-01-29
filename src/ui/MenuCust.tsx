import classNames from "classnames";
import { useState, createContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import useOutsideClick from "../hooks/useClickOutside";

interface IMenuCust extends React.HTMLAttributes<HTMLElement>{
  topButton?: string
  topMenu?: string
}

const MyContext = createContext('')

const MenuCust = ({children,topButton,topMenu}:IMenuCust) => {
  const [mouseIn, setMouseIn] = useState<boolean>(false)
  const [menu, setMenu] = useState<boolean>(false)
  
  const showMenu = () => {setMenu(true)}
  const hideMenu = () => {setMenu(false)}

  const showCut = () => {setMouseIn(true)}
  const hideCut = () => {setMouseIn(false)}

  const styleMenuButton = classNames(topButton,'absolute bg-slate-700 top-[47%] text-slate-400 flex justify-center items-center rounded-l-md w-[30px] h-[60px] hover:bg-slate-600 transition-all active:bg-slate-500', 
  {"right-[399px]": menu,
   "right-[10px]": !menu},
   {"right-[10px]":!mouseIn,
    "right-[29px] bg-slate-600":mouseIn})
  const styleMenu = classNames(topMenu,'absolute right-0 bg-slate-700 text-slate-400 h-full w-[400px] flex flex-col before:scale-0 after:scale-100 transition-all')
  const styleMenuCut = classNames("bg-slate-700 absolute h-full top-0 right-0 w-[30px] transition-all",
  {"translate-x-[20px] ":!mouseIn,
    "translate-x-[0px] bg-slate-600":mouseIn})

  return ( 
    <>
    <MyContext>
      <div onMouseEnter={e=>showCut()} onMouseLeave={e=>hideCut()} onClick={!menu?showMenu:hideMenu} className={styleMenuCut}></div>
      <button onMouseEnter={e=>showCut()} onMouseLeave={e=>hideCut()} onClick={!menu?showMenu:hideMenu} className={styleMenuButton}><FaChevronLeft className={classNames({"rotate-180":menu})}/></button> 
      <div className={!menu?classNames(styleMenu,"translate-x-[100%]"):classNames(styleMenu,"translate-x-[0%]")}>
        {children}
      </div>
    </MyContext>
    </>
   );
}
 
export default MenuCust;