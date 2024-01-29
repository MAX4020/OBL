import { HTMLAttributes, useRef, useState } from 'react';
import { FaChevronRight,FaChevronLeft } from 'react-icons/fa6';
import './App.css';
import Chunk from './ui/Chunk';
import Monitor from './ui/Monitor';
import MenuCust from "./ui/MenuCust"
import useOutsideClick from './hooks/useClickOutside';
import { link } from 'fs';
import classNames from 'classnames';

const monitors:any = [
  {
    name:"HDMI-1",
    point:{row:1,col:1},
    size:{h:2,w:2},
    grid:{row:6,col:8}
  },
  {
    name:"HDMI-2",
    point:{row:1,col:3},
    size:{h:1,w:1},
    grid:{row:3,col:4}
  },
  {
    name:"HDMI-3",
    point:{row:2,col:3},
    size:{h:1,w:1},
    grid:{row:3,col:4}
  }
]

function App() {
  const [xy_start, setxystart] = useState<[number,number]>([0,0])
  const [xy_end, setxyend] = useState<[number,number]>([1,1])
  const [startArea, setStartArea] = useState<boolean>(false)
  const [startPos, setStartPos] = useState<[number,number]>([0,0])
  const [fCol, setFCol] = useState<number>(4)
  const [fRow, setFRow] = useState<number>(3)
  const [formatMenu, setFormatMenu] = useState<boolean>(false)

  const handleChangeCol = (event:any) => {
    setFCol(event.target.value)
  }
  const handleChangeRow = (event:any) => {
    setFRow(event.target.value)
  }

  const start = () => {
    setStartArea(true)}

  const showFormatMenu = () =>{setFormatMenu(true)}
  const hideFormatMenu = () =>{setFormatMenu(false)}

  const onClickStart = (row:number,col:number) => {
    setxystart([col,row])
  }

  const onMouseEnterHandler = (row:number,col:number) =>{
    // console.log(`row = ${row}`)
    // console.log(`col = ${col}`)
    if (startArea){
      console.log([col,row])
      setxyend([col+1,row+1])
    }
  }

  const createCase = (grid:[number,number]) => {
    const cells:any = []
    for(let i = 1;i<=grid[0];i++)
      for(let j = 1;j<=grid[1];j++)
        cells.push(<div onMouseEnter={()=>onMouseEnterHandler(j,i)} onClick={()=>onClickStart(j,i)} className='border-2 border-slate-200/25'></div>)
    return cells
  }

  const styleButton = classNames(' p-2 hover:bg-slate-600 transition-all active:bg-slate-500 border-b-2 border-slate-600')
  const styleGrid = classNames('absolute top-0 left-0 w-full h-full grid')
  const styleDivFormat = classNames('border-2 border-slate-400 transition-all flex flex-col justify-center text-center absolute top-[12%] w-full',
  {'right-[-100%]': !formatMenu,
   'right-0':formatMenu}
  )
  const styleInput = classNames('m-2 h-[40px] bg-slate-800 outline-none p-2')

  return (
    <>
    <Monitor>
      {monitors.map((item:any) => <Chunk style={{
        gridColumnStart:  item.point.col,
        gridColumnEnd:    item.point.col + item.size.w,
        gridRowStart:     item.point.row,
        gridRowEnd:       item.point.row + item.size.h,

        gridTemplateRows:     `repeat(${item.grid.row},1fr)`,
        gridTemplateColumns:  `repeat(${item.grid.col},1fr)`
      }}>
        <div className='text-slate-400'>{item.name}</div>
        {/* {createCase([item.grid.row,item.grid.col])} */}
      </Chunk>)}
      <div className={styleGrid} style={{
        gridTemplateRows:     `repeat(${fRow * 2},1fr)`,
        gridTemplateColumns:  `repeat(${fCol * 3},1fr)`
      }}>
        <div className='bg-red-100/75' style={{
        gridColumnStart:  xy_start[1],
        gridRowStart:     xy_start[0],
        gridColumnEnd:    xy_end[1],
        gridRowEnd:       xy_end[0]
        }}></div>
      </div>      
      <div className={styleGrid} style={{
        gridTemplateRows:     `repeat(${fRow * 2},1fr)`,
        gridTemplateColumns:  `repeat(${fCol * 3},1fr)`
      }}>
        {createCase([fRow * 2,fCol * 3])}
      </div>
    </Monitor>
    <MenuCust>
      <button className={styleButton}>Редактировать область</button>
      <button onClick={e=>start()} className={styleButton}>Добавить область</button>
      <button onClick={!formatMenu?showFormatMenu:hideFormatMenu} className={styleButton}>Задать минимальный формат</button>
      <div className={styleDivFormat} ><p className='p-2'>Минимальный формат</p>
        <input className={styleInput} type="number" placeholder='Колонны' value={fCol} onChange={(event)=>handleChangeCol(event)}/>
        <input className={styleInput} type="number" placeholder='Строки' value={fRow} onChange={(event)=>handleChangeRow(event)}/>
        <button onClick={!formatMenu?showFormatMenu:hideFormatMenu} className='bg-slate-800 p-2 m-2 hover:bg-slate-600 active:bg-slate-500'>Закрыть</button>
      </div>
    </MenuCust>
    </>
  );
}

export default App;
